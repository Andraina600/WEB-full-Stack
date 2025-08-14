import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [editing, setEditing] = useState(null); // ID du personnage en cours d'édition, null sinon
  const [adding, setAdding] = useState(false); // True si ajout en cours
  const [form, setForm] = useState({ name: '', realName: '', universe: '' }); // Champs du formulaire
  const [success, setSuccess] = useState(false); // Notification de succès
  const [error, setError] = useState(''); // Message d'erreur

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const res = await axios.get('http://localhost:8080/characters');
      setCharacters(res.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const deleteCharacter = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/characters/${id}`);
      fetchCharacters();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const startEdit = (character) => {
    setEditing(character.id);
    setAdding(false); // Assure que adding est désactivé
    setForm({
      name: character.name,
      realName: character.realName,
      universe: character.universe,
    });
    setError('');
  };

  const cancelForm = () => {
    setEditing(null);
    setAdding(false);
    setForm({ name: '', realName: '', universe: '' });
    setError('');
  };

  const submitForm = async () => {
    if (!form.name || !form.realName || !form.universe) {
      setError('All fields are required!');
      return;
    }
    try {
      if (adding) {
        // Ajout d'un nouveau personnage
        await axios.post('http://localhost:8080/characters', form);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Notification disparaît après 3s
      } else if (editing) {
        // Mise à jour d'un personnage existant
        await axios.put(`http://localhost:8080/characters/${editing}`, form);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
      cancelForm();
      fetchCharacters();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to save character. Please try again.');
    }
  };

  return (
    <div className="p-5 text-center max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">CRUD Character App</h1>

      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4 animate-fade-in">
          {adding ? 'Personnage ajouté avec succès !' : 'Personnage mis à jour avec succès !'}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-5"
        onClick={() => {
          setAdding(true);
          setEditing(null);
          setForm({ name: '', realName: '', universe: '' });
          setError('');
        }}
      >
        Add New Character
      </button>

      <table className="w-full border-collapse border border-gray-300 md:table block overflow-x-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3">#</th>
            <th className="border border-gray-300 p-3">Name</th>
            <th className="border border-gray-300 p-3">Real Name</th>
            <th className="border border-gray-300 p-3">Universe</th>
            <th className="border border-gray-300 p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char, index) => (
            <tr key={char.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{index + 1}</td>
              <td className="border border-gray-300 p-3">{char.name}</td>
              <td className="border border-gray-300 p-3">{char.realName}</td>
              <td className="border border-gray-300 p-3">{char.universe}</td>
              <td className="border border-gray-300 p-3">
                <button
                  className="bg-green-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-green-600 mr-2"
                  onClick={() => startEdit(char)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-600"
                  onClick={() => deleteCharacter(char.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(adding || editing) && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            {adding ? 'Add New Character' : `Edit Character: #${editing}`}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                className={`border rounded p-2 w-100 ${
                  form.name ? 'border-gray-300' : 'border-red-500 bg-red-50'
                }`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Real Name</label>
              <input
                className={`border rounded p-2 w-100 ${
                  form.realName ? 'border-gray-300' : 'border-red-500 bg-red-50'
                }`}
                value={form.realName}
                onChange={(e) => setForm({ ...form, realName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Universe</label>
              <input
                className={`border rounded p-2 w-100 ${
                  form.universe ? 'border-gray-300' : 'border-red-500 bg-red-50'
                }`}
                value={form.universe}
                onChange={(e) => setForm({ ...form, universe: e.target.value })}
              />
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-600"
                onClick={submitForm}
              >
                {adding ? 'Add' : 'Update'}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
                onClick={cancelForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;