import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Subscribe = () => {

  const form = useRef(); // keeping mutable value

  const templateParams = { // these parameters are outlined in the template
    recipient: 'your.wisewallet@gmail.com',
    to_name: 'Test Account',
    message: 'This is a test email sent using EmailJS!'
  };

  const sendEmail = (e) => { // send email trigger
    e.preventDefault();
    emailjs.send('service_vcya2vm', 'template_57i8kep', templateParams, 'xZBCwlq2NxOnENizZ') // 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY'
      .then(() => {
        alert("Success. Message sent!")
      }, () => {
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