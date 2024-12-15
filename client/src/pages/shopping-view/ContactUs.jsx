import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toast } from '../../components/ui';

const initialState = { email: '', subject: '', message: '' };

function ContactUs() {

  const [formData, setFormData] = useState(initialState);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    Toast({ type: 'success', message: "Message send successfully" });
    setFormData(initialState);
  };

  return (
    <Fragment>
      {/* destop view */}
      <section className="hidden md:block bg-gray-50">
        <div className="p-8 bg-white rounded-lg mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-[#eb918f]">Contact Us</h2>
          <p className="mb-8 font-light text-center text-gray-500 text-xl">Got a technical issue? Want to send feedback about our services? Let us know.</p>
          <form className="space-y-4" onSubmit={onsubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">Your email</label>
              <input type="email" id="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5" value={formData.email} onChange={changeHandler} placeholder="name@email.com" required />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-base font-medium text-gray-900">Subject</label>
              <input type="text" id="subject" name="subject" className="block p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm" value={formData.subject} onChange={changeHandler} placeholder="Let us know how we can help you" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-base font-medium text-gray-900">Your message</label>
              <textarea id="message" name="message" rows="6" className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300" value={formData.message} onChange={changeHandler} placeholder="Leave a comment..."></textarea>
            </div>
            <p className='font-light text-gray-500 text-base'>By submitting this form you agree to our <Link className="text-[#eb918f] hover:underline">terms and conditions</Link> and our <Link className="text-[#eb918f] hover:underline">privacy policy</Link> which explains how we may collect, use and disclose your personal information including to third parties.</p>
            <button type="submit" className="w-36 h-14 text-base font-medium hover:bg-orange-300 text-white rounded-lg bg-orange-400 ">Send message</button>
          </form>
        </div>
      </section>

    {/* mobile view */}
      <section class="md:hidden block bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-[#eb918f]">Contact Us</h2>
              <p className="mb-8 font-light text-center text-gray-500 text-xl">Got a technical issue? Want to send feedback about our services? Let us know.</p>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">Your email</label>
                  <input type="email" id="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5" value={formData.email} onChange={changeHandler} placeholder="name@email.com" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-base font-medium text-gray-900">Subject</label>
                  <input type="text" id="subject" name="subject" className="block p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm" value={formData.subject} onChange={changeHandler} placeholder="Let us know how we can help you" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-base font-medium text-gray-900">Your message</label>
                  <textarea id="message" name="message" rows="6" className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300" value={formData.message} onChange={changeHandler} placeholder="Leave a comment..."></textarea>
                </div>
                <p className='font-light text-gray-500 text-base'>By submitting this form you agree to our <Link className="text-[#eb918f] hover:underline">terms and conditions</Link> and our <Link className="text-[#eb918f] hover:underline">privacy policy</Link> which explains how we may collect, use and disclose your personal information including to third parties.</p>
                <button type="submit" className="w-36 h-14 text-base font-medium hover:bg-orange-300 text-white rounded-lg bg-orange-400">Send message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default ContactUs;
