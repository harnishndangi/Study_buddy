import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Layout/Sidebar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    priority: "medium",
    subject: "",
    reminder: "",
    files: [],
  });

  // API base URL - adjust according to your backend
  const API_URL = "http://localhost:3000/api/tasks";

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("deadline", formData.deadline);
      formDataToSend.append("priority", formData.priority);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("reminder", formData.reminder);

      // Append files
      Array.from(formData.files).forEach((file) => {
        formDataToSend.append("files", file);
      });

      await axios.post(API_URL, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowCreateForm(false);
      resetForm();
      fetchTasks();
      alert("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("deadline", formData.deadline);
      formDataToSend.append("priority", formData.priority);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("reminder", formData.reminder);

      // Append files if any
      Array.from(formData.files).forEach((file) => {
        formDataToSend.append("files", file);
      });

      await axios.put(`${API_URL}/${editingTask._id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditingTask(null);
      resetForm();
      fetchTasks();
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_URL}/${taskId}`);
        fetchTasks();
        alert("Task deleted successfully!");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task");
      }
    }
  };

  // Complete task
  const completeTask = async (taskId) => {
    try {
      await axios.post(`${API_URL}/${taskId}/complete`);
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to complete task");
    }
  };

  // Update priority
  const updatePriority = async (taskId, priority) => {
    try {
      await axios.post(`${API_URL}/${taskId}/priority`, { priority });
      fetchTasks();
    } catch (error) {
      console.error("Error updating priority:", error);
      alert("Failed to update priority");
    }
  };

  // Update deadline
  const updateDeadline = async (taskId, deadline) => {
    try {
      await axios.post(`${API_URL}/${taskId}/deadline`, { deadline });
      fetchTasks();
    } catch (error) {
      console.error("Error updating deadline:", error);
      alert("Failed to update deadline");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      deadline: "",
      priority: "medium",
      subject: "",
      reminder: "",
      files: [],
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  // Start editing task
  const startEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      deadline: task.deadline
        ? new Date(task.deadline).toISOString().slice(0, 16)
        : "",
      priority: task.priority,
      subject: task.subject || "",
      reminder: task.reminder
        ? new Date(task.reminder).toISOString().slice(0, 16)
        : "",
      files: [],
    });
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString()
      : "No date set";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 pb-4 border-b border-gray-200 gap-4 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  <span className="text-blue-600">Tasks</span>{" "}
                  <span className="text-gray-700">Management</span>
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center text-sm text-gray-500">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {tasks.length} Tasks
                  </span>
                </div>

                <button
                  onClick={() => setShowCreateForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="font-medium">Create Task</span>
                </button>
              </div>
            </div>

            {/* Create/Edit Task Form */}
            {(showCreateForm || editingTask) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">
                    {editingTask ? "Edit Task" : "Create New Task"}
                  </h2>
                  <form onSubmit={editingTask ? updateTask : createTask}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Deadline
                      </label>
                      <input
                        type="datetime-local"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Reminder
                      </label>
                      <input
                        type="datetime-local"
                        name="reminder"
                        value={formData.reminder}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Attachments (Max 5 files)
                      </label>
                      <input
                        type="file"
                        name="files"
                        multiple
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {editingTask ? "Update Task" : "Create Task"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateForm(false);
                          setEditingTask(null);
                          resetForm();
                        }}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Tasks List */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading tasks...</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      No tasks found. Create your first task!
                    </p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task._id}
                      className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
                        task.completed
                          ? "border-green-500 opacity-75"
                          : "border-blue-500"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-semibold ${
                              task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {task.title}
                          </h3>
                          {task.subject && (
                            <p className="text-sm text-gray-600 mt-1">
                              Subject: {task.subject}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority.toUpperCase()}
                          </span>
                          {task.completed && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                              COMPLETED
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                        <div>
                          <strong>Deadline:</strong> {formatDate(task.deadline)}
                        </div>
                        <div>
                          <strong>Reminder:</strong> {formatDate(task.reminder)}
                        </div>
                      </div>

                      {task.attachments && task.attachments.length > 0 && (
                        <div className="mb-4">
                          <strong className="text-sm text-gray-700">
                            Attachments:
                          </strong>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {task.attachments.map((attachment, index) => (
                              <a
                                key={index}
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                              >
                                {attachment.filename}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {!task.completed && (
                          <button
                            onClick={() => completeTask(task._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}

                        <button
                          onClick={() => startEdit(task)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>

                        <select
                          value={task.priority}
                          onChange={(e) =>
                            updatePriority(task._id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>

                        <input
                          type="datetime-local"
                          defaultValue={
                            task.deadline
                              ? new Date(task.deadline)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onBlur={(e) => {
                            if (e.target.value) {
                              updateDeadline(task._id, e.target.value);
                            }
                          }}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          title="Update deadline"
                        />

                        <button
                          onClick={() => deleteTask(task._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Tasks;
