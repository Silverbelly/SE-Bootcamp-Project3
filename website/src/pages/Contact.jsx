import '../page-styles/Contact.css';
import React, { useState, useRef } from 'react';

function Contact() {
  const [formContainerClass, setFormContainerClass] = useState('formContainer');
  const [thankyouClass, setThankyouClass] = useState('thankyouContainerHidden');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const commentRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormContainerClass('formContainerHidden');
    setThankyouClass('thankyouContainer');
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
    <div className="contactBodyContainer">
      <div>Contact</div>
      <div className={formContainerClass}>
        <form action="#" method="GET" onSubmit={handleSubmit}>
          <div className="formRow">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              name="first-name"
              type="text"
              required
              ref={firstRef}
              onChange={() => handleChange('first-name')}
            />
          </div>
          <div className="formRow">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              required
              ref={lastRef}
              onChange={() => handleChange('last-name')}
            />
          </div>
          <div className="formRow">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              ref={emailRef}
              onChange={() => handleChange('email')}
            />
          </div>
          <div className="formRow">
            <label htmlFor="comment">Comment</label>
            <textarea name="comment" id="comment" ref={commentRef} onChange={() => handleChange('comment')} />
          </div>
          <div className="form-row">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className={thankyouClass}>
        <div>
          Thank you!
        </div>
        <div className="thankyouRow">
          <label>First Name</label>
          <label className="submittedValue">{firstName}</label>
        </div>
        <div className="thankyouRow">
          <label>Last Name</label>
          <label className="submittedValue">{lastName}</label>
        </div>
        <div className="thankyouRow">
          <label>Email</label>
          <label className="submittedValue">{email}</label>
        </div>
        <div className="thankyouRow">
          <label>Comment</label>
          <label className="submittedValue">{comment}</label>
        </div>
      </div>
    </div>
  );
}

export default Contact;
