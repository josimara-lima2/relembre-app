import React, { useState } from 'react';

export default function MetaAgua() {
  const [metaAgua, setMetaAgua] = useState(2000);
  return (
    <div className="flex flex-col  min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4">Consumo de Água</h1>
      <p className="mb-2 text-gray-600">Defina sua meta diária de consumo de água:</p>
      <input
        type="number"
        placeholder="Ex: 2000 ml"
        className="border border-gray-300 outline-none p-2 rounded w-48"
        value={metaAgua}
        onChange={(e) => setMetaAgua(parseInt(e.target.value))}
      />
      <button
        onClick={() => setMetaAgua(parseInt(document.querySelector('input[type="number"]').value))}
        className="mt-4 px-6 py-2 bg-blue-600 max-w-min hover:bg-blue-700 text-white font-semibold rounded shadow transition-colors duration-200"
      >
        Salvar
      </button>
    </div>
  );
}
