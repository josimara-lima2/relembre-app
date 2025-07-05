export default function MetaAgua() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Consumo de Água</h1>
      <p className="mb-2 text-gray-600">Defina sua meta diária de consumo de água:</p>
      <input
        type="number"
        placeholder="Ex: 2000 ml"
        className="border p-2 rounded w-48"
      />
    </div>
  );
}
