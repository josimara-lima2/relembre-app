import { useState, useEffect } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import respiracao from './../assets/images/respiracao.png';
import alongamento from './../assets/images/alongamento.png';
import pausa from './../assets/images/pausa.png';
import postura from './../assets/images/postura.png';
import andando from './../assets/images/andando.png';
import salada from './../assets/images/salada.png';
import agua from './../assets/images/agua.png';


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
  { key: 'respiracao', title: 'Respiração', img: respiracao},
  { key: 'postura', title: 'Postura', img: postura },
  { key: 'desconectar', title: 'Desconectar', img: andando },
  { key: 'alimentacao', title: 'Alimentação', img: salada }
];

const ideiasPorHabito = {
  pausa: [
    'Levante-se e caminhe por 5 minutos',
    'Dance ao som de uma música animada',
    'Olhe pela janela e respire fundo'
  ],
  alongamento: [
    'Estique os braços para cima e respire',
    'Gire os ombros 10 vezes',
    'Alongue o pescoço suavemente para os lados'
  ],
  respiracao: [
    'Inspire por 4s, segure 4s, expire 4s (respiração quadrada)',
    'Feche os olhos e concentre-se em 5 respirações profundas',
    'Use um app de respiração guiada por 1 minuto'
  ],
  postura: [
    'Ajuste a altura da tela na linha dos olhos',
    'Mantenha os pés apoiados no chão',
    'Evite curvar os ombros para frente'
  ],
  desconectar: [
    'Feche os olhos por 1 minuto',
    'Tire 3 minutos para pensar em algo positivo',
    'Desligue notificações por 15 minutos'
  ],
  alimentacao: [
    'Prepare um lanche saudável com frutas',
    'Evite comidas pesadas durante o expediente',
    'Beba um chá calmante entre tarefas'
  ]
};

const PageHome = ({ user }) => {
  const [metaAgua, setMetaAgua] = useState(2000);
  const [dicaIndex, setDicaIndex] = useState(0);
  const [habitoSelecionado, setHabitoSelecionado] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDicaIndex((prev) => (prev + 1) % dicasSaude.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Olá, <span className="text-indigo-600">{user?.username || 'usuário'}</span>
        </h1>
        <p className="text-gray-500">Vamos cuidar da sua saúde hoje?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center gap-4">
          <img src={agua} alt="" className='w-16 h-16' />
          <div>
            <p className="text-sm text-blue-700 font-medium">Meta diária</p>
            <p className="text-2xl font-bold text-blue-800">{metaAgua} ml</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-6 flex flex-col relative min-h-[200px]">
          <p className="text-purple-700 font-medium text-lg text-center my-auto  flex items-center justify-center transition">
            {dicasSaude[dicaIndex]}
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            {dicasSaude.map((_, i) => (
              <div
                key={i}
                className={clsx(
                  'w-2.5 h-2.5 rounded-full transition-all',
                  dicaIndex === i ? 'bg-purple-600 scale-110' : 'bg-gray-300'
                )}
              />
            ))}
          </div>
          <button
            onClick={() => setDicaIndex((dicaIndex - 1 + dicasSaude.length) % dicasSaude.length)}
            className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
          >
            <BsArrowLeft size={20} />
          </button>
          <button
            onClick={() => setDicaIndex((dicaIndex + 1) % dicasSaude.length)}
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
          >
            <BsArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {habitos.map((card) => (
          <button
            key={card.key}
            onClick={() => setHabitoSelecionado(card.key)}
            className="bg-white p-6 rounded-2xl cursor-pointer shadow hover:shadow-md transition text-center"
          >
            <img src={card.img} alt={card.title} className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
          </button>
        ))}
      </div>

      {habitoSelecionado && (
        <div className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-600">
              Ideias para: {habitos.find((h) => h.key === habitoSelecionado)?.title}
            </h2>
            <button
              onClick={() => setHabitoSelecionado(null)}
              className="text-sm text-gray-500 cursor-pointer hover:underline"
            >
              Fechar
            </button>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {ideiasPorHabito[habitoSelecionado].map((dica, i) => (
              <li key={i}>{dica}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PageHome;
