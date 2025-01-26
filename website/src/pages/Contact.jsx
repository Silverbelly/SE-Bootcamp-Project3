import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../page-styles/Contact.css';

function Contact() {
  const [validated, setValidated] = useState(false);

  const [formContainerClass, setFormContainerClass] = useState('');
  const [thankyouClass, setThankyouClass] = useState('thankyouContainerHidden');
  const [submitError, setSubmitError] = useState('d-none');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const commentRef = useRef();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    let isValid = form.checkValidity();
    if (isValid === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (isValid === true) {
      event.preventDefault();

      const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        comment: comment,
      };
      try {
        const response = await fetch('https://formspree.io/f/mwpvvqoa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormContainerClass('formContainerHidden');
          setThankyouClass('thankyouContainer');
        } else {
          console.error('Error submitting form:', response.status);
          setFormContainerClass('formContainerHidden');
          setSubmitError('d-block')
        }
      } catch (error) {
        console.error('Error on submit attempt: ', error);
        setFormContainerClass('formContainerHidden');
        setSubmitError('d-block');
      }
    }
  };

  const handleChange = (element) => {
    switch (element) {
      case 'first-name':
        setFirstName(firstRef.current.value);
        break;
      case 'last-name':
        setLastName(lastRef.current.value);
        break;
      case 'email':
        setEmail(emailRef.current.value);
        break;
      case 'comment':
        setComment(commentRef.current.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Container className={`w-90 justify-content-start bodyTop ${formContainerClass}`}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" lg="4" controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                ref={firstRef}
                onChange={() => handleChange('first-name')}
              />
              <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" lg="4" controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                ref={lastRef}
                onChange={() => handleChange('last-name')}
              />
              <Form.Control.Feedback type="invalid">Please enter your last name.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" lg="4" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                ref={emailRef}
                onChange={() => handleChange('email')}
              />
              <Form.Control.Feedback type="invalid">Please enter your email address.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" lg="4" controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                placeholder="Comments"
                ref={commentRef}
                onChange={() => handleChange('comment')}
              />
              <Form.Control.Feedback type="invalid">Please provide a comment.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button variant="info" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <Container className={`w-90 justify-content-start contactBodyContainer ${thankyouClass}`}>
        <Row className="mb-3">
          <Col>Thank you!<br />Your comments have been received.</Col>
        </Row>
        <Row className="mb-1">
          <Col sm={3}>First Name:</Col>
          <Col>{firstName}</Col>
        </Row>
        <Row className="mb-1">
          <Col sm={3}>Last Name:</Col>
          <Col>{lastName}</Col>
        </Row>
        <Row className="mb-1">
          <Col sm={3}>Email:</Col>
          <Col>{email}</Col>
        </Row>
        <Row className="mb-1">
          <Col sm={3}>Comments:</Col>
          <Col>{comment}</Col>
        </Row>
      </Container>
      <Container className={`w-90 justify-content-start contactBodyContainer ${submitError}`}>
        <Row>
          An unexpected error occurred while submitting your comments. Try again later.
        </Row>
      </Container>
    </>
  );
}

export default Contact;
