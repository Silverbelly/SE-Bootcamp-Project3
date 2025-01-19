import { useState, useRef, useEffect } from 'react';
//import Checkbox from './Checkbox';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState('All');

  const filterRef = useRef();
  const idRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    fetch('./constants/initialData.json')
      .then((x) => x.json())
      .then((data) => {
        setTaskList(data);
      });
  }, []);

  // useEffect( () => {
  //   console.log('useEffect: taskList');
  //   setFilteredTaskList(taskList);
  // }, [taskList]);

  // const handleFilter = () => {
  //   let filteredTodos = taskList;
  //   let filter = filterRef.current.value;
  //   console.log(`filter is ${filter}`,'handleFilter:taskList', taskList)
  //   if (filter === 'Done') {
  //       filteredTodos = taskList.filter((item) => item.isDone == true);
  //   } else if (filter === 'Not Done') {
  //       filteredTodos = taskList.filter((item) => item.isDone == false);
  //   }
  //   console.log('handleFilter:filteredTodos', filteredTodos)
  //   setFilteredTaskList(filteredTodos);
  // };

  // const handleDone = (id) => {
  //   let newAllTodoData = taskList;
  //   for (let todo of newAllTodoData) {
  //       if (todo.id === id) todo.isDone = !todo.isDone;
  //   }
  //   setTaskList(newAllTodoData);
  //   setFilteredTaskList(newAllTodoData);
  //   console.log(`id = ${id}`, 'handleDone:newTodos', newAllTodoData);
  //   //handleFilter();
  // };

  // const handleEdit = (id) => {
  //   const item = taskList[taskList.findIndex(item => item.id === id)];
  //   idRef.current.value = id;
  //   descriptionRef.current.value = item.description;
  //   let defaultDate = new Date(item.dueDate.year, item.dueDate.month, item.dueDate.day).toISOString().split('T')[0];
  //   dateRef.current.defaultValue = defaultDate;(new Date(item.dueDate.year, item.dueDate.month, item.dueDate.day));
  // };

  // const handleDelete = (id) => {
  //   console.log('delete', id);
  //   let newTodos = taskList.filter(item => item.id != id);
  //   setTaskList(newTodos);
  //   handleFilter();
  // };

  // const editRef = useRef(null);

  const toggleDone = (id) => {
    let updatedTaskList = taskList;
    let ndx = updatedTaskList.findIndex((item) => item.id === id);
    updatedTaskList[ndx].isDone = !updatedTaskList[ndx].isDone;
    console.log(`id=${id} ndx=${ndx}`, 'updatedTaskList', updatedTaskList);
    setTaskList(updatedTaskList);
    console.log('filtered', filteredTaskList())
  };

  const handleFilter = () => {
    setFilter(filterRef.current.value);
  };

  const handleEdit = () => {
    alert('handleEdit');
  };

  const handleDelete = () => {
    alert('handleEdit');
  };

  const handleSave = () => {
    alert('handleSave');
  };

  const filteredTaskList = () => {
    if (filter === 'notDone')
      return taskList.filter((item) => item.isDone === false);
    if (filter === 'done')
      return taskList.filter((item) => item.isDone === true);
    return taskList;
  };

  return (
    <div>
      <div>
        Viewing:&nbsp;&nbsp;
        <select name="filter" ref={filterRef} onChange={handleFilter}>
          <option value="all">All</option>
          <option value="notDone">Not Done</option>
          <option value="done">Done</option>
        </select>
      </div>
      <TaskList items={filteredTaskList()} toggleDone={toggleDone} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div>
        <label>
          Description
          <br />
          <input type="text" ref={descriptionRef} />
        </label>
      </div>
      <div>
        <label>
          Due date
          <br />
          <input type="date" ref={dateRef} />
        </label>
      </div>
      <div>
        <label>
          ID
          <br />
          <input type="text" ref={idRef} />
        </label>
      </div>
      <div>
        <button onClick={() => handleSave()}>Save</button>
      </div>
    </div>
  );
}

export default App;
