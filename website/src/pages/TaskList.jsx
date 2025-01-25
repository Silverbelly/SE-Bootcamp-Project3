import '../page-styles/TaskList.css';
import React from 'react';
import TaskInsertUpdate from './TaskInsertUpdate';

function TaskList({
  items,
  toggleDone,
  handleEdit,
  handleDelete,
  formattedDate,
  filter,
  setFilter,
  idRef,
  descriptionRef,
  dateRef,
  saveDisabled,
  handleSave,
  handleCancelSave,
  operation,
  setSaveDisabled,
}) {
  return (
    <div className="taskListBodyContainer">
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
      <table>
        <thead>
          <tr>
            <th scope="col">Done</th>
            <th scope="col">Due Date</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            let className = 'incomplete';
            if (item.isDone) className = 'complete';
            return (
              <tr className={className}>
                <td>
                  <input type="checkbox" checked={item.isDone} onChange={() => toggleDone(item.id)} />
                </td>
                <td>{formattedDate(item.dueDate.month, item.dueDate.day, item.dueDate.year)}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <TaskInsertUpdate
          idRef={idRef}
          descriptionRef={descriptionRef}
          dateRef={dateRef}
          saveDisabled={saveDisabled}
          handleSave={handleSave}
          handleCancelSave={handleCancelSave}
          operation={operation}
          setSaveDisabled={setSaveDisabled}
        />
      </div>
    </div>
  );
}

export default TaskList;
