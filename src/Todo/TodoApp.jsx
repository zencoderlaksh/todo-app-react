import React, { useState, useEffect, useCallback, useMemo } from 'react';

const TodoApp = () => {
  // 1. State for todos and new todo input
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // 2. useEffect to load initial data (simulated)
  useEffect(() => {
    const initialTodos = [
      { id: 1, text: "Learn React", completed: false },
      { id: 2, text: "Build a project", completed: true },
    ];
    setTodos(initialTodos);
  }, []);

  // 3. useCallback for adding a new todo
  const handleAddTodo = useCallback(() => {
    if (!newTodo.trim()) return; // avoid adding empty todos
    const newTask = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setNewTodo(""); // clear the input
  }, [newTodo, todos]);

  // 4. useCallback for deleting a todo
  const handleDeleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  // 5. useCallback for toggling todo completion
  const handleToggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // 6. useMemo to count completed todos
  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  // 7. Rendering the todo list with Tailwind CSS
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Todo List</h1>
        
        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddTodo}
            className="p-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition duration-300"
          >
            Add Todo
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 flex justify-between items-center border rounded-lg ${
                todo.completed ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <span
                className={`flex-grow ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleToggleComplete(todo.id)}
                  className={`p-2 rounded ${
                    todo.completed
                      ? 'bg-yellow-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-gray-700 font-semibold">
          <strong>Completed Tasks: {completedCount}</strong>
        </p>
      </div>
    </div>
  );
};

export default TodoApp;
