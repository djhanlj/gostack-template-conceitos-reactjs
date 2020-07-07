import React, { useState, useEffect } from "react";
import Lista from './components/Lista'

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "http://github.com",
      techs: ['js', 'react', 'laravel'],
      likes: 0
    });

    const repository = response.data;
    setRepository([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`/repositories/${id}`);
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepository([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <Lista key={repository.id} id={repository.id} handleAddRepository={handleRemoveRepository}>
            {repository.title}
          </Lista>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
