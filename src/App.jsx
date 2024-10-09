import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const initialTodos = [
    'Buy groceries',
    'Walk the dog',
    'Read a book',
    'Attend a meeting',
    'Go to the gym',
    'Finish homework',
    'Clean the house',
    'Pay bills',
    'Call mom',
    'Plan vacation',
    'Complete project',
    'Schedule dentist appointment',
    'Watch a movie',
    'Learn React',
    'Cook dinner',
    'Exercise',
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
//It is the function to add input to search box
  const handleAddTodo = () => {
    if (!inputValue) return;
  
    // Check for duplicates
    if (todos.includes(inputValue.trim())) {
      alert("This todo item already exists!"); 
      return;
    }
  
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) => (index === editIndex ? inputValue : todo));
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, inputValue.trim()]); // Add trimmed input
    }
    
    setInputValue('');
  };
// It is the function to edit the added entries by the user
  const handleEditTodo = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

// It is the function to delete the entries by the user
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    if (currentPage > Math.ceil(updatedTodos.length / itemsPerPage)) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    
    if (totalPages <= 1) return;

    // Always add the first page
    pages.push(
      <button key={1} onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'active' : ''}>
        1
      </button>
    );

    // Add ellipsis if the first page is not adjacent
    if (currentPage > 3) {
      pages.push(<span key="ellipsis-start">...</span>);
    }

    // Add the surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }

    // Add ellipsis if the last page is not adjacent
    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis-end">...</span>);
    }

    // Always add the last page
    if (totalPages > 1) {
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={currentPage === totalPages ? 'active' : ''}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };
// -------------------------------------------------------------------------------------------------------------
  return (
    <div className="app">
      <Header />
      <main>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo"
          className="input"
        />
        <button onClick={handleAddTodo} className="add-button">
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
        <ul className="todo-list">
          {currentTodos.map((todo, index) => (
            <li key={index} className="todo-item">
              <div className="todo-content">
                <span>{todo}</span>
                <div>
                  <button onClick={() => handleEditTodo(index + indexOfFirstTodo)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteTodo(index + indexOfFirstTodo)} className="delete-button">Delete</button>
                </div>
              </div>
              <hr className="divider" />
            </li>
          ))}
        </ul>
        <div className="pagination">
          {renderPagination()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
