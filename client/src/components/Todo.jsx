import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaSun, FaMoon } from "react-icons/fa";

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addTask = () => {
    if (!newTask.trim()) return;

    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, text: newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      const newEntry = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date(),
      };
      setTasks((prev) => [newEntry, ...prev]);
    }
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setNewTask(task.text);
    setEditingTask(task);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  const calculateProgress = () => {
    const completed = tasks.filter((task) => task.completed).length;
    return tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
  };
  const clearCompleted = () => setTasks(tasks.filter((task) => !task.completed));

  return (
    <div className="todo-container min-h-screen flex flex-col items-center p-8">
      <header className="flex justify-between items-center w-full max-w-4xl mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Task Master
        </h1>
      
      </header>

      <div className="flex gap-4 w-full max-w-4xl mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-4 rounded-xl focus:outline-none focus:ring-2"
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition"
        >
          {editingTask ? <FaEdit /> : <FaPlus />}
        </button>
      </div>
      

      <div className="flex gap-4 mb-8">
        {["All", "Pending", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-lg transition ${
              filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl mb-6">
        <p className="text-lg mb-2">Progress: {calculateProgress()}%</p>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${calculateProgress()}%` }}
          ></div>

        </div>
      </div>

      <ul className="task-list w-full max-w-4xl space-y-4">
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded-lg flex justify-between items-center shadow-lg transition-transform hover:scale-105 ${
              task.completed ? "bg-green-500 text-white" : "bg-gray-800 text-gray-100"
            }`}
          >
            <p className="text-xl">{task.text}</p>

            <div className="flex gap-4">
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? <FaTimesCircle /> : <FaCheckCircle />}
              </button>
              <button onClick={() => editTask(task)}>
                <FaEdit />
              </button>
              <button onClick={() => deleteTask(task.id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
