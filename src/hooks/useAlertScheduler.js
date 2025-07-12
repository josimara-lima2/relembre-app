import { useEffect, useRef } from 'react';
import respiracao from './../assets/images/respiracao.png';
import alongamento from './../assets/images/alongamento.png';
import pausa from './../assets/images/pausa.png';
import postura from './../assets/images/postura.png';
import desconectar from './../assets/images/andando.png';
import alimentacao from './../assets/images/salada.png';
import agua from './../assets/images/agua.png';
import { fetchAuthSession } from '@aws-amplify/auth';
import axios from 'axios';
let notificacaoBlock = false;

export default function useAlertScheduler() {
  const timeoutRef = useRef(null);
  const meta = useRef(2000)

  const buscarMetaAgua = async () => {
  try {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();

    const { data } = await axios.get(
      'https://7oyg2tk4qa.execute-api.us-east-1.amazonaws.com/v1/meta-agua/',
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    console.log('Meta atual:', data.metaAgua);
    return data.metaAgua;
  } catch (err) {
    console.error('Erro ao buscar meta de água:', err);
    return null;
  }
};

useEffect(() => {
    const metaAgua = async () => {
      try {
        meta.current = await buscarMetaAgua();
        if (meta.current) {
          console.log('Meta de água atual:', meta.current);
        }
      } catch (err) {
        console.error('Erro ao buscar meta de água:', err);
      }
    };

    metaAgua();
  }, []); 

  const imagesHabitos = {
    pausa, alongamento, respiracao, postura, desconectar, alimentacao, agua
  };


  const handleHabito = async () => {
    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      const res = await axios.post(
        "https://7oyg2tk4qa.execute-api.us-east-1.amazonaws.com/v1/alert",
        {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      }
      );
      console.log('Resposta da API:', res.data);
      return res.data[0] || null
    } catch (error) {
      console.error('Erro na chamada autenticada:', error);
    }
  };

  
  async function disparaNotificacao() {
    if (Notification.permission !== 'granted') return;
    if (notificacaoBlock) return;

    const habit = await handleHabito();
    console.log('Disparando notificação:', habit);
    if (!habit) return;
    const corpo = habit.key.startsWith('agua')
      ? `${habit.body}! Sua Meta é: ${meta.current || '2000'} ml`
      : habit.body;
    const keyPrefix = habit.key.split('_')[0];
    const iconImg = imagesHabitos[keyPrefix] || imagesHabitos[habit.key];


    new Notification(habit.title, {
      body: corpo,
      icon: iconImg,
      tag: habit.key,
      silent: false,
      renotify: true,
    });
  };
  function notificacoesInterval() {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const taskActive = { id: null };
      if (!taskActive?.id) {
        disparaNotificacao();
        notificacoesInterval();
      }
    }, 30000); // 30 segundos
  }

  function blockNotificacao() {
    notificacaoBlock = true;
  }

  async function initNotificacoes() {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          notificacoesInterval();
        }
      } catch (e) {
        console.error(`Permissão negada: ${e}`);
      }
    } else if (Notification.permission === 'granted') {
      notificacoesInterval();
    } else {
      console.warn('Notificações bloqueadas pelo navegador.');
    }
  }

  return {
    initNotificacoes,
    blockNotificacao
  };
}