import { useEffect, useState } from 'react';
import api from './api/axios'; // ✅ Axios instance (configure baseURL in api/axios.js)
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tasks from API
    // TODO: Confirm endpoint path with backend devs — assuming /tasks for now
    api
      .get('/tasks')
      .then((res) => {
        setTasks(res.data || []);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch tasks:', err);
        setError('Unable to load tasks. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>🧪 React Task Evaluator</h1>

      {loading && <p>⏳ Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="task-list">
          {tasks.length === 0 ? (
            <li>No tasks found. ✅</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> — {task.status}
              </li>
            ))
          )}
        </ul>
      )}

      {/* TODO: Add feature to create new tasks */}
      {/* TODO: Implement task status updates */}
    </div>
  );
}

export default App;
