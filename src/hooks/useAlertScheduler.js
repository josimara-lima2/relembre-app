import { useRef } from 'react';
import respiracao from './../assets/images/respiracao.png';
import alongamento from './../assets/images/alongamento.png';
import pausa from './../assets/images/pausa.png';
import postura from './../assets/images/postura.png';
import andando from './../assets/images/andando.png';
import salada from './../assets/images/salada.png';
import agua from './../assets/images/agua.png';

let notificacaoBlock = false;

export default function useAlertScheduler() {
  const timeoutRef = useRef(null);
  const lastHabitIndexRef = useRef(null);

  const habitos = [
    { key: 'pausa', title: 'Pausa Ativa', img: pausa, body: 'Levante-se e caminhe por 5 minutos' },
    { key: 'alongamento', title: 'Alongamento', img: alongamento, body: 'Estique os braços e as pernas' },
    { key: 'respiracao', title: 'Respiração', img: respiracao, body: 'Respire profundamente por 5 vezes' },
    { key: 'postura', title: 'Postura', img: postura, body: 'Ajuste sua cadeira e tela' },
    { key: 'desconectar', title: 'Desconectar', img: andando, body: 'Desconecte-se por 5 minutos' },
    { key: 'alimentacao', title: 'Alimentação', img: salada, body: 'Coma um lanche saudável' },
    { key: 'agua', title: 'Água', img: agua, body: 'Beba um copo de água' }
  ];

  function getRandomHabitIndex() {
    let idx;
    do {
      idx = Math.floor(Math.random() * habitos.length);
    } while (habitos.length > 1 && idx === lastHabitIndexRef.current);
    lastHabitIndexRef.current = idx;
    return idx;
  }

  function disparaNotificacao() {
    if (Notification.permission !== 'granted') return;
    if (notificacaoBlock) return;

    const habit = habitos[getRandomHabitIndex()];
    new Notification(habit.title, {
      body: habit.body,
      icon: habit.img,
      tag: habit.key,
      silent: false,
      renotify: true,
    });
  }

  function notificacoesInterval() {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const taskActive = { id: null };
      if (!taskActive?.id) {
        disparaNotificacao();
        notificacoesInterval();
      }
    }, 1800000); // 30 minutos
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