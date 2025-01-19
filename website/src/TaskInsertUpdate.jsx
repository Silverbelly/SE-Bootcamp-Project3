import './TaskInsertUpdate.css';
import React  from 'react';

function TaskInsertUpdate({idRef, descriptionRef, dateRef, saveDisabled, handleSave, handleCancelSave, operation}) {
  const editText = operation === 'insert' ? 'Add new task' : 'Edit task';

  return (
    
    <div className="crupContainer">
      <div>
        <label>{editText}</label>
      </div>
      <div>
        <label>
          ID
          <br />
          <input type="text" ref={idRef} />
        </label>
      </div>
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
        <button onClick={() => handleSave()} disabled={saveDisabled}>
          Save
        </button>
        <button className="cancelButton" onClick={handleCancelSave} disabled={saveDisabled}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TaskInsertUpdate;
