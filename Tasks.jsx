"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '@/utils/ApiUrl';
import TaskCard from '@/app/components/common/TaskCard';

const Tasks = ({role}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/tasks/user',getAuthHeaders());
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className=" bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.task_id}
              task={task}
              onUpdateStatus={fetchTasks}
              role={role}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;