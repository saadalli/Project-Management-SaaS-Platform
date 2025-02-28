'use client'
import { useState } from 'react';
import axios from 'axios';
import FormInput from '@/app/components/common/FormInput';
import Button from '@/app/components/common/Button';
import { getAuthHeaders } from '@/utils/ApiUrl';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:8080/api/v1/user/create-task', { title, description },getAuthHeaders());
      alert('Task created successfully');
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Task</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <FormInput
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <FormInput
          label="Description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;