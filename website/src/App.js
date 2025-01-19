import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList';
import TaskInsertUpdate from './TaskInsertUpdate';

function App() {
  const [items, setItems] = useState([]);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'done', or 'notDone'
  const [operation, setOperation] = useState('insert');

  const idRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    fetch('./constants/initialData.json')
      .then((x) => x.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const formattedDate = (month, day, year) => {
    let myDate = new Date(year, month, day);
    return myDate.toLocaleString('default', { dateStyle: 'long' });
  };

  const handleDelete = (id) => {
    console.log(`handleDelete(${id})`);
    let updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
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
    let i = updatedItems.findIndex((item) => item.id === idRef.current.value);
    if (dateRef.current.value === null) {
      alert('Invalid Due date.');
      return;
    }
    const selectedDate = dateRef.current.value;
    console.log(selectedDate, selectedDate.slice(0, 4), selectedDate.slice(5, 7), selectedDate.slice(-2));
    updatedItems[i].dueDate = {
      month: Number(selectedDate.slice(5, 7)) - 1,
      day: Number(selectedDate.slice(-2)),
      year: Number(selectedDate.slice(0, 4)),
    };
    updatedItems[i].description = descriptionRef.current.value;
    setItems(updatedItems);
    handleCancelSave();
  };

  const handleCancelSave = () => {
    idRef.current.value = '';
    descriptionRef.current.value = '';
    dateRef.current.value = null;
    setOperation('insert');
    setSaveDisabled(true);
  }

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
    <div>
      <h1>Task List</h1>
      <div>
        <label>Filter by:&nbsp;</label>
        <label>
          <input type="radio" value="all" checked={filter === 'all'} onChange={() => setFilter('all')} />
          All
        </label>
        <label>
          <input type="radio" value="done" checked={filter === 'done'} onChange={() => setFilter('done')} />
          Done
        </label>
        <label>
          <input type="radio" value="notDone" checked={filter === 'notDone'} onChange={() => setFilter('notDone')} />
          Not Done
        </label>
      </div>
      {/* <ChildComponent items={filteredItems} toggleDone={toggleDone} /> */}
      <TaskList
        items={filteredItems}
        toggleDone={toggleDone}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        formattedDate={formattedDate}
      />
      <TaskInsertUpdate
        idRef={idRef}
        descriptionRef={descriptionRef}
        dateRef={dateRef}
        saveDisabled={saveDisabled}
        handleSave={handleSave}
        handleCancelSave={handleCancelSave}
        operation={operation}
      />
    </div>
  );
}

export default App;
