import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';



const Subscribe = () => {

  const form = useRef();

  const templateParams = {
    recipient: 'your.wisewallet@gmail.com',
    to_name: 'Test Account',
    message: 'This is a test email sent using EmailJS!'
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send('service_vcya2vm', 'template_57i8kep', templateParams, 'xZBCwlq2NxOnENizZ')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Success. Message sent!")

      }, (err) => {
        console.log('FAILED...', err);
        alert("Failure. Message did not send!")

      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Your Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default Subscribe;