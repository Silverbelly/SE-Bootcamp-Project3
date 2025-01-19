import './TaskList.css';
import React from 'react';

function TaskList({ items, toggleDone, handleEdit, handleDelete, formattedDate }) {

  return (
    <div>
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
            return (
              <tr>
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
    </div>
  );
}

export default TaskList;
