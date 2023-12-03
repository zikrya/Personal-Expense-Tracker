import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Subscribe = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    var templateParams = {
        to_name: 'Test',
        recipient: 'your.wisewallet@gmail.com'
    };
    emailjs.send('service_vcya2vm', 'welcome_1ywtamz', templateParams)
      .then(() => {
          alert("Success");
      }, () => {
          alert("Failed");
      });
  };

  return (
    <div>
    <h1>Subscribe</h1>
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <input type="submit" value="Send" />
    </form>
    </div>
  );
};

export default Subscribe;
