import React, { useEffect, useState } from 'react';
import { fetchAuthSession } from '@aws-amplify/auth';
import axios from 'axios';
export default function CardDicas({
    habitos,
    habitoSelecionado,
    setHabitoSelecionado,
}) {
    const [ideiasAPI, setIdeiasAPI] = useState([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIdeiasAPI([]);
        const buscarIdeias = async () => {
            setIsActive(true);
            if (!habitoSelecionado) return;

            try {
                const session = await fetchAuthSession();
                const idToken = session.tokens?.idToken?.toString();

                const { data } = await axios.post(
                    `https://7oyg2tk4qa.execute-api.us-east-1.amazonaws.com/v1/alert`, {
                    "q": habitoSelecionado
                },
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log('Ideias recebidas:', data);
                setIdeiasAPI(data);
            } catch (err) {
                console.error('Erro ao buscar ideias:', err);
            } finally {
                setIsActive(false);
            }
        };

        buscarIdeias();
    }, [habitoSelecionado]);
    const titulo = habitos.find((h) => h.key === habitoSelecionado)?.title || 'Hábito';

    const ideias = ideiasAPI.length > 0
        ? ideiasAPI.map((item) => item.body || '')
        : [];

    return (
        <div  className="bg-white md:col-span-2 border border-indigo-100 rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-indigo-600">
                    Ideias para: {titulo}
                </h2>
                <button
                    onClick={() => setHabitoSelecionado(null)}
                    className="text-sm text-gray-500 cursor-pointer hover:underline"
                >
                    Fechar
                </button>
            </div>

            {isActive && <p className="text-gray-500">Carregando ideias...</p>}

            {ideias.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {ideiasAPI.map((item) => item.body).map((dica, i) => (
                        <li key={i}>{dica}</li>
                    ))}
                </ul>
            ) : (
                <>{isActive ? '' : <p className="text-gray-500">Nenhuma ideia disponível.</p>}</>
            )}
        </div>
    );
}
