import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', realName: '', universe: '' });

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const res = await axios.get('http://localhost:8080/characters');
    setCharacters(res.data);
  };

  const deleteCharacter = async (id) => {
    await axios.delete(`http://localhost:8080/characters/${id}`);
    fetchCharacters();
  };

  const startEdit = (character) => {
      setEditing(character.id);
      setForm({
        name: character.name,
        realName: character.realName,
        universe: character.universe,
      });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', realName: '', universe: '' });
  };

  const submitEdit = async () => {
    await axios.put(`http://localhost:8080/characters/${editing}`, form);
    cancelEdit();
    fetchCharacters();
  };

  const submitAdd = async () => {
    await axios.post('http://localhost:8080/characters', form);
    setAdding(false);
    setForm({ name: '', realName: '', universe: '' });
    fetchCharacters();
  };

  const cancelAdd = () => {
    setAdding(false);
    setForm({ name: '', realName: '', universe: '' });
  };



  return (
    <div className="p-5 max-w-4xl flex-col text-center mx-auto">
      <h1 className="text-4xl font-bold mb-5">Marvel Charcater</h1>
        <button
          className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 mb-5"
          onClick={() => setAdding(true)}
        >
            Add New Character
        </button>

      
      <table className="w-full border-collapse border border-black">
        <thead>
          <tr className="bg-black0">
            <th className="border border-black p-3">id</th>
            <th className="border border-black p-3">Name</th>
            <th className="border border-black p-3">Real Name</th>
            <th className="border border-black p-3">Universe</th>
            <th className="border border-black p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char, index) => (
            <tr key={char.id}>
              <td className="border border-black p-3">{index + 1}</td>
              <td className="border border-black p-3">{char.name}</td>
              <td className="border border-black p-3">{char.realName}</td>
              <td className="border border-black p-3">{char.universe}</td>
              <td className="border border-black p-3">
                <button
                  className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  onClick={() => startEdit(char)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteCharacter(char.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Edit Character: #{editing}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                className="border border-gray-300 rounded p-2 w-100"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Real Name</label>
              <input
                className="border border-gray-300 rounded p-2 w-100"
                value={form.realName}
                onChange={(e) => setForm({ ...form, realName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Universe</label>
              <input
                className="border border-gray-300 rounded p-2 w-100"
                value={form.universe}
                onChange={(e) => setForm({ ...form, universe: e.target.value })}
              />
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={submitEdit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {adding && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Add New Character</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                className="border border-gray-300 rounded p-2 w-100"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Real Name</label>
              <input
                className="border border-gray-300 rounded p-2 w-100"
                value={form.realName}
                onChange={(e) => setForm({ ...form, realName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Universe</label>
              <input
                className="border border-gray-300 rounded p-2 w-100"
                value={form.universe}
                onChange={(e) => setForm({ ...form, universe: e.target.value })}
              />
            </div>
            <div className="space-x-5">
              <button
                className="bg-blue-500 w-20 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={submitAdd}
              >
                Add
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={cancelAdd}
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