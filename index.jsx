// components/TaskCard.js
import { useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '@/utils/ApiUrl';

const TaskCard = ({ task, onAssign, onUpdateStatus,role }) => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState(task.status || 'pending');

  const handleAssignTask = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/user/task/${task.task_id}`, { assigned_to: assignedTo },getAuthHeaders());
      onAssign(); // Refresh the task list
      setIsAssignModalOpen(false);
      alert('Task assigned successfully');
    } catch (err) {
      alert('Failed to assign task');
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/user/task/${task.task_id}/status/${status}`, { status },getAuthHeaders());
      onUpdateStatus(); // Refresh the task list
      setIsStatusModalOpen(false);
      alert('Task status updated successfully');
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500">Created by: {task.created_by}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>

      {/* Assign Task Button */}
      {role === "admin"&&
      <button
      className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
      onClick={() => setIsAssignModalOpen(true)}
      >
        Assign Task
      </button>
    }

      {/* Update Status Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        onClick={() => setIsStatusModalOpen(true)}
      >
        Update Status
      </button>

      {/* Assign Task Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Assign Task</h2>
            <input
              type="text"
              placeholder="Enter User ID"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAssignTask}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Update Task Status</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsStatusModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;