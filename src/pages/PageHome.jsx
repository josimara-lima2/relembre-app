import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchAuthSession } from '@aws-amplify/auth';
import CardDicas from '../components/CardDicas';
import agua from './../assets/images/agua.png';
import pausa from './../assets/images/pausa.png';
import alongamento from './../assets/images/alongamento.png';
import respiracao from './../assets/images/respiracao.png';
import postura from './../assets/images/postura.png';
import andando from './../assets/images/andando.png';
import salada from './../assets/images/salada.png';
import SwiperDicas from '../components/SwiperDicas';
import clsx from 'clsx';

const dicasSaude = [
  'Beba água regularmente durante o expediente.',
  'Faça uma pausa ativa a cada 60 minutos.',
  'Descanse seus olhos por 20 segundos olhando à distância.',
  'Alimente-se com frutas ou castanhas entre as tarefas.',
  'Reserve 5 minutos para desconectar-se mentalmente.'
];

const habitos = [
  { key: 'pausa', title: 'Pausa Ativa', img: pausa },
  { key: 'alongamento', title: 'Alongamento', img: alongamento },
  { key: 'respiracao', title: 'Respiração', img: respiracao },
  { key: 'postura', title: 'Postura', img: postura },
  { key: 'desconectar', title: 'Desconectar', img: andando },
  { key: 'alimentacao', title: 'Alimentação', img: salada }
];

// const ideiasPorHabito = {
//   pausa: [
//     'Levante-se e caminhe por 5 minutos',
//     'Dance ao som de uma música animada',
//     'Olhe pela janela e respire fundo'
//   ],
//   alongamento: [
//     'Estique os braços para cima e respire',
//     'Gire os ombros 10 vezes',
//     'Alongue o pescoço suavemente para os lados'
//   ],
//   respiracao: [
//     'Inspire por 4s, segure 4s, expire 4s (respiração quadrada)',
//     'Feche os olhos e concentre-se em 5 respirações profundas',
//     'Use um app de respiração guiada por 1 minuto'
//   ],
//   postura: [
//     'Ajuste a altura da tela na linha dos olhos',
//     'Mantenha os pés apoiados no chão',
//     'Evite curvar os ombros para frente'
//   ],
//   desconectar: [
//     'Feche os olhos por 1 minuto',
//     'Tire 3 minutos para pensar em algo positivo',
//     'Desligue notificações por 15 minutos'
//   ],
//   alimentacao: [
//     'Prepare um lanche saudável com frutas',
//     'Evite comidas pesadas durante o expediente',
//     'Beba um chá calmante entre tarefas'
//   ]
// };

const PageHome = ({ user }) => {
  const [metaAgua, setMetaAgua] = useState(0);
  const [dicaIndex, setDicaIndex] = useState(0);
  const [habitoSelecionado, setHabitoSelecionado] = useState(null);

  


  useEffect(() => {
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
        setMetaAgua(data.metaAgua);
      } catch (err) {
        console.error('Erro ao buscar meta de água:', err);
      }
    };

    buscarMetaAgua();

    const interval = setInterval(() => {
      setDicaIndex((prev) => (prev + 1) % dicasSaude.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Olá, <span className="text-indigo-600">{user?.signInDetails?.loginId || user?.username}</span>
        </h1>
        <p className="text-gray-500">Vamos cuidar da sua saúde hoje?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center gap-4">
          <img src={agua} alt="Ícone de água" className='w-16 h-16' />
          <div>
            <p className="text-sm text-blue-700 font-medium">Meta diária</p>
            <p className="text-2xl font-bold text-blue-800">{metaAgua} ml</p>
          </div>
        </div>

        <SwiperDicas
          dicasSaude={dicasSaude}
          setDicaIndex={setDicaIndex}
          dicaIndex={dicaIndex}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {habitos.map((card) => (
          <button
            key={card.key}
            onClick={() => setHabitoSelecionado(card.key)}
            className={clsx( "bg-white p-6 rounded-2xl cursor-pointer border shadow hover:shadow-md transition text-center", { 'border-indigo-500': habitoSelecionado === card.key, 'border-gray-200': habitoSelecionado !== card.key })}
          >
            <img src={card.img} alt={card.title} className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
          </button>
        ))}
      </div>

      {habitoSelecionado && (
        <CardDicas
          habitos={habitos}
          habitoSelecionado={habitoSelecionado}
          setHabitoSelecionado={setHabitoSelecionado}
        />
      )}
    </div>
  );
};

export default PageHome;
