import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
      console.log(response.data);
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        "title": "Repositório ReactJS",
        "url": "http://github.com/josuefeitosa",
        "techs": ["NodeJS", "ReactJS"]
      });

      const repository = response.data;
      setRepositories([...repositories, repository]);      
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter((repository) => repository.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => {
          return (
            <>
              <li key={ repository.id }>{ repository.title }</li>
              <button onClick={() => handleRemoveRepository( repository.id )}>
                Remover
              </button>
            </>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
