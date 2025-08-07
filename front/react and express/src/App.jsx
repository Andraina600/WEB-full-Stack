import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);


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


  return (
    <div className="p-5 max-w-4xl flex-col text-center mx-auto">
      <h1 className="text-4xl font-bold mb-5">CRUD Character App</h1>
      
      <table className="w-full border-collapse border border-black">
        <thead>
          <tr className="bg-black0">
            <th className="border border-black p-3">#</th>
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
    </div>
  );
}

export default App;