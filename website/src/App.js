import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import TaskList from './pages/TaskList';
import Contact from './pages/Contact';

function App() {
  const [items, setItems] = useState([]);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [filter, setFilter] = useState('notDone'); // 'all', 'done', or 'notDone'
  const [operation, setOperation] = useState('insert');

  const idRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    fetch('/constants/initialData.json')
      .then((x) => x.json())
      .then((data) => {
        setItems(data.sort(sortByDate));
      });
  }, []);

  const sortByDate = (a, b) => {
    const tsA = new Date(a.dueDate.year, a.dueDate.month, a.dueDate.day);
    const tsB = new Date(b.dueDate.year, b.dueDate.month, b.dueDate.day);
    return tsA - tsB;
  };

  const formattedDate = (month, day, year) => {
    let myDate = new Date(year, month, day);
    return myDate.toLocaleString('default', { dateStyle: 'medium' });
  };

  const handleDelete = (id) => {
    let updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    handleCancelSave();
  };

  const handleEdit = (id) => {
    let item = items.find((item) => item.id === id);
    idRef.current.value = item.id;
    descriptionRef.current.value = item.description;
    dateRef.current.value =
      `${item.dueDate.year}-` +
      `${(item.dueDate.month + 1).toString().padStart(2, '0')}-` +
      `${item.dueDate.day.toString().padStart(2, '0')}`;
    setOperation('update');
    setSaveDisabled(false);
  };

  const handleSave = () => {
    let updatedItems = [...items];
    if (operation === 'update') {
      let i = updatedItems.findIndex((item) => item.id === idRef.current.value);
      if (dateRef.current.value === null) {
        alert('Invalid Due date.');
        return;
      }
      //const selectedDate = dateRef.current.value;
      updatedItems[i].dueDate = getDueDateObject();
      updatedItems[i].description = descriptionRef.current.value;
    } else {
      let newItem = {};
      newItem.id = getNewId();
      newItem.isDone = false;
      newItem.dueDate = getDueDateObject();
      newItem.description = descriptionRef.current.value;
      updatedItems.push(newItem);
    }
    setItems(updatedItems.sort(sortByDate));
    handleCancelSave();
  };

  const getNewId = () => {
    const currentDate = new Date();
    const id =
      currentDate.getUTCFullYear().toString().slice(2, 4) +
      (currentDate.getUTCMonth() + 1).toString().padStart(2, '0') +
      currentDate.getUTCDate().toString().padStart(2, '0') +
      currentDate.getUTCHours().toString().padStart(2, '0') +
      currentDate.getUTCMinutes().toString().padStart(2, '0') +
      currentDate.getUTCSeconds().toString().padStart(2, '0');

    return id;
  };

  const getDueDateObject = () => {
    const selectedDate = dateRef.current.value;
    const dueDateObject = {
      month: Number(selectedDate.slice(5, 7)) - 1,
      day: Number(selectedDate.slice(-2)),
      year: Number(selectedDate.slice(0, 4)),
    };
    return dueDateObject;
  };

  const handleCancelSave = () => {
    idRef.current.value = '';
    descriptionRef.current.value = '';
    dateRef.current.value = null;
    setOperation('insert');
    setSaveDisabled(true);
  };

  // Function to handle toggling the 'done' status
  const toggleDone = (id) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)));
  };

  // Filter items based on the selected filter
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'done') return item.isDone;
    if (filter === 'notDone') return !item.isDone;
    return true;
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <TaskList
              items={filteredItems}
              toggleDone={toggleDone}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              formattedDate={formattedDate}
              filter={filter}
              setFilter={setFilter}
              idRef={idRef}
              descriptionRef={descriptionRef}
              dateRef={dateRef}
              saveDisabled={saveDisabled}
              handleSave={handleSave}
              handleCancelSave={handleCancelSave}
              operation={operation}
              setSaveDisabled={setSaveDisabled}
            />
          }
        />
        <Route
          path="todos"
          element={
            <TaskList
              items={filteredItems}
              toggleDone={toggleDone}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              formattedDate={formattedDate}
              filter={filter}
              setFilter={setFilter}
              idRef={idRef}
              descriptionRef={descriptionRef}
              dateRef={dateRef}
              saveDisabled={saveDisabled}
              handleSave={handleSave}
              handleCancelSave={handleCancelSave}
              operation={operation}
              setSaveDisabled={setSaveDisabled}
            />
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
