import '../page-styles/TaskInsertUpdate.css';
import React from 'react';
import Button from 'react-bootstrap/Button';

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
    <div className="text-start bg-info-subtle border border-2 border-info rounded p-3 align-top">   
      <div className="border-bottom border-2 border-info mb-2">
        <label>{editText}</label>
      </div>
      <div>
        <input type="hidden" ref={idRef} />
      </div>
      <div>
        <label className="description mb-2">
          Description
          <br />
          <input type="text" ref={descriptionRef} onChange={handleOnChange} />
        </label>
      </div>
      <div>
        <label className="mb-2">
          Due date
          <br />
          <input type="date" ref={dateRef} onChange={handleOnChange} />
        </label>
      </div>
      <div>
        <Button variant="info" className="mt-2 me-3 py-1" onClick={() => handleSave()} disabled={saveDisabled}>
          Save
        </Button>
        <Button  variant="info" className="mt-2 me-3 py-1" onClick={handleCancelSave} disabled={saveDisabled}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default TaskInsertUpdate;
