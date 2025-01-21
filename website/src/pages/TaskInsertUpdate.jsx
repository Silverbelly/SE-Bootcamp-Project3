import '../page-styles/TaskInsertUpdate.css';
import React from 'react';

function TaskInsertUpdate({
  idRef,
  descriptionRef,
  dateRef,
  saveDisabled,
  operation,
  handleSave,
  handleCancelSave,
  setSaveDisabled,
}) {
  const editText = operation === 'insert' ? 'Add new task' : 'Edit task';

  const handleOnChange = () => {
    if (operation === 'insert') {
      if (descriptionRef.current.value !== '' && dateRef.current.value !== '') {
        setSaveDisabled(false);
      }
    }
  };

  return (
    <div className="crupContainer">
      <div>
        <label>{editText}</label>
      </div>
      <div>
        <input type="hidden" ref={idRef} />
      </div>
      <div>
        <label>
          Description
          <br />
          <input type="text" ref={descriptionRef} onChange={handleOnChange} />
        </label>
      </div>
      <div>
        <label>
          Due date
          <br />
          <input type="date" ref={dateRef} onChange={handleOnChange} />
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
