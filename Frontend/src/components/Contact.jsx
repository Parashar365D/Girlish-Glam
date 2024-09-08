import React, { useState } from 'react';
import contactImg from "../assets/contactImg.avif";

function Contact() {

  const [contact, setContact] = useState({ name: '', email: '', message: '' });

  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const contactHandler = (e) => {
    e.preventDefault();
    alert('Message has been send');
    window.location.replace('/');
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-5 bg-gray-100 shadow-md">
      <div className="w-full md:w-2/3 lg:w-3/4 p-4 flex flex-col md:flex-row bg-white rounded-lg shadow-md">
        <div className="md:w-1/2 p-4">
          <form className="flex flex-col justify-center h-full" onSubmit={contactHandler}>
            <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
              <input type="text" id="name" name="name" value={contact.name} onChange={changeHandler} className="border rounded-md block w-full py-2 px-3 mt-1 focus:outline-none focus:border-indigo-500" placeholder="Enter Your Name" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <input type="email" name="email" id="email" value={contact.email} onChange={changeHandler} className="border rounded-md block w-full py-2 px-3 mt-1 focus:outline-none focus:border-indigo-500" placeholder="Enter Your Email" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
              <textarea rows="4" id="message" name="message" value={contact.message} onChange={changeHandler} className="border rounded-md block w-full py-2 px-3 mt-1 focus:outline-none focus:border-indigo-500" placeholder="Enter Your Message Here..." required />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:bg-indigo-600">Submit</button>
            </div>
          </form>
        </div>
        <div className="md:w-1/2 p-4 flex items-center justify-center">
          <img src={contactImg} alt="Contact Us" className="w-full h-auto rounded-md shadow-md" />
        </div>
      </div>
    </section>
  );
}

export default Contact;
