import { useRef } from 'react';
import emailjs from '@emailjs/browser';

// contact us form taken from EmailJS website
const Contact = () => {

  const form = useRef(); // keeping mutable value

  const sendEmail = (e) => { // send email trigger
    e.preventDefault();
    emailjs.sendForm('service_vcya2vm', 'template_57i8kep', form.current, 'xZBCwlq2NxOnENizZ') // 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY'
      .then(() => {
        alert("Success. Message sent!") // will replace this with toastify soon
        form.current.reset(); // empty input after user successfully submits
      }, () => {
        alert("Failure. Message did not send!") // will replace this with toastify soon
      });
  };

  return (
    <form id="contact" className="mx-36 pb-10" ref={form} onSubmit={sendEmail}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            First Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="from_name"
              className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="user_email"
              className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Message
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="message"
              className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-1">
          <button
            type="submit"
            value="Send"
            className="min-w-full mt-8 p-3 block w-full rounded-md bg-green border-0 hover:bg-darkgreen py-1.5 text-mint shadow-sm ring-1 ring-inset ring-green placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            Send 
          </button></div>
      </div>

    </form >
  );
};

export default Contact;