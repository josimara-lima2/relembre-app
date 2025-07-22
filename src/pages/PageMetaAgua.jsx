import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { fetchAuthSession } from '@aws-amplify/auth';
import axios from 'axios';

export default function MetaAgua() {
  const [metaAgua, setMetaAgua] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    buscarMetaAgua().then(setMetaAgua);
  }, []);

  const buscarMetaAgua = async () => {
    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_API}meta-agua/`,
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
      setIsLoading(true);
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      const response = await axios.post(
        `${import.meta.env.VITE_URL_API}meta-agua`,
        { metaAgua: novaMeta },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );


      const notify = () => toast('Meta de água salva com sucesso!', {
        position: "top-right"
      });

      notify();
    } catch (err) {
      console.error('Erro ao salvar meta:', err);
      toast.error('Erro ao salvar meta de água', {
        position: "top-right"
      });
    } finally {
      setIsLoading(false);
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
        onChange={(e) => setMetaAgua(parseInt(e.target.value))}
      />

      <button
        disabled={isLoading}
        className={`mt-4 px-6 py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} max-w-min text-white font-semibold rounded shadow transition-colors duration-200`}
        onClick={() => salvarMetaAgua(metaAgua)}
      >
        Salvar
      </button>
      <ToastContainer />
    </div>
  );
}
