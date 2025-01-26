import React, { useRef } from 'react';
import TaskInsertUpdate from './TaskInsertUpdate';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import '../page-styles/TaskList.css';

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
  const selectRef = useRef();

  const selectChanged = () => {
    let selected = selectRef.current.value;
    setFilter(selected);
  };

  return (
    <div className="topPadding">
      <Container className="w-90 justify-content-start">
        <Row>
          <Col className="mb-3">
            <label className="pe-2">View:</label>
            <Form.Select size="sm" className="bg-info view d-inline-block" ref={selectRef} value={filter} onChange={selectChanged}>
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="notDone">Not Done</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-start">
            <Row className="border-bottom border-info">
              <Col xs={2} md={1}>
                Done
              </Col>
              <Col xs={3} md={2}>
                Due
              </Col>
              <Col>
                Description
              </Col>
            </Row>
            {items.map((item) => {
              let className = 'incomplete';
              if (item.isDone) className = 'complete';
              return (
                <Row key={item.id} className="pb-1">
                  <Col xs={2} md={1}>
                    <input type="checkbox" checked={item.isDone} onChange={() => toggleDone(item.id)} />
                  </Col>
                  <Col xs={3} md={2} className={className}>
                    {formattedDate(item.dueDate.month, item.dueDate.day, item.dueDate.year)}
                  </Col>
                  <Col className={className}>
                    {item.description}
                  </Col>
                  <Col xs={3} md={2}>
                    <Button
                      variant="info"
                      size="sm"
                      className="p-0 px-1 align-baseline"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      variant="info"
                      size="sm"
                      className="p-0 px-1 align-baseline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
        <Row className="p-0">
          <Col lg={4} sm={6} className="p-0 mt-2">
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TaskList;
