import React, { useState, useEffect } from 'react';
import { fetchAuthSession } from '@aws-amplify/auth';
import axios from 'axios';

export default function MetaAgua() {
  const [metaAgua, setMetaAgua] = useState(2000);

  useEffect(() => {
    buscarMetaAgua().then(setMetaAgua);
  }, []);

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


  const salvarMetaAgua = async (novaMeta) => {
    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      const response = await axios.post(
        'https://7oyg2tk4qa.execute-api.us-east-1.amazonaws.com/v1/meta-agua',
        { metaAgua: novaMeta },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      alert(response.data.message);
    } catch (err) {
      console.error('Erro ao salvar meta:', err);
      alert('Erro ao salvar meta de água');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Consumo de Água</h1>
      <p className="mb-2 text-gray-600">Defina sua meta diária de consumo de água (ml):</p>

      <input
        type="number"
        placeholder="Ex: 2000 ml"
        className="border border-gray-300 outline-none p-2 rounded w-48"
        value={metaAgua}
        onChange={(e) => setMetaAgua(parseInt(e.target.value) || 0)}
      />

      <button
        onClick={() => salvarMetaAgua(metaAgua)}
        className="mt-4 px-6 py-2 bg-blue-600 max-w-min hover:bg-blue-700 text-white font-semibold rounded shadow transition-colors duration-200"
      >
        Salvar
      </button>
    </div>
  );
}
