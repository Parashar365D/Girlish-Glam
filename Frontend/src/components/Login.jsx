import React, { useState } from 'react';
import loginImg from "../assets/login-img.png";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });

  const API = import.meta.env.VITE_URI;

  const SPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleSection = () => {
    setIsSignUp(!isSignUp);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInHandle = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${API}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const logInResult = await response.json();

        if (response.ok) {
            localStorage.setItem('auth-token', logInResult.authtoken);
            alert('Login Successfully');
            window.location.replace('/');
        } else {
            console.error('Error In Login:', logInResult.error || logInResult.errors);
            alert(`Login Failed: ${logInResult.error || logInResult.errors.map(err => err.msg).join(', ')}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    }
};

  

  const signUpHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/user/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const signUpResult = await response.json();
  
      if (response.ok) {
        localStorage.setItem('auth-token', signUpResult.authtoken);
        alert('Account Created Successfully');
        window.location.replace('/');
      } else {
        console.error('Error In SignUp:', signUpResult.errors || signUpResult.error);
        alert(`Signup Failed: ${signUpResult.errors?.map(err => err.msg).join(', ') || signUpResult.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <section className='p-8 flex justify-center items-center bg-gray-100'>
      <div className="flex flex-col md:flex-row items-center justify-center border rounded-xl shadow-lg bg-white">
        {isSignUp ? (<div className={`w-72 md:w-[56%] mb-6 md:mb-0`}>
          <img className='object-cover rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500' src={loginImg} alt="login-img" />
        </div>) : (<div className={`w-72 md:w-96 mb-6 md:mb-0`}>
          <img className='object-cover rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500' src={loginImg} alt="login-img" />
        </div>)}
        <div className={`p-6 w-72 ${isSignUp ? 'md:w-[44%]' : 'md:w-96'}`}>
          <div className='flex justify-center items-center text-3xl mb-8 text-gray-800 font-light'>{isSignUp ? 'Signup' : 'Login'}</div>
          <form onSubmit={isSignUp ? signUpHandle : logInHandle}>
            {isSignUp && (
              <>
                <div className='mb-4'>
                  <label htmlFor="name" className='block text-gray-700 font-medium'>Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={changeHandler} className='border rounded-md block w-full py-2 px-3 mt-1 h-10 focus:outline-none focus:border-indigo-500' minLength={3} required />
                </div>
                <div className='mb-4'>
                  <label htmlFor="phone" className='block text-gray-700 font-medium'>Phone No.</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={changeHandler} className='border rounded-md block w-full py-2 px-3 mt-1 h-10 focus:outline-none focus:border-indigo-500' minLength={10} maxLength={10} required />
                </div>
              </>
            )}
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 font-medium'>Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={changeHandler} className='border rounded-md block w-full py-2 px-3 mt-1 h-10 focus:outline-none focus:border-indigo-500' required />
            </div>
            <div className='mb-4 relative'>
              <label htmlFor="password" className='block text-gray-700 font-medium'>Password</label>
              <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={formData.password} onChange={changeHandler} className='border rounded-md block w-full py-2 px-3 mt-1 h-10 focus:outline-none focus:border-indigo-500' minLength={8} required />
              <div className="flex items-center pr-3 mt-2">
                <input type="checkbox" id="show-password" onClick={SPassword} className='mr-2' />
                <label htmlFor="show-password" className='text-gray-700 cursor-pointer select-none'>Show Password</label>
              </div>
            </div>
            <button type="submit" className='w-full py-2 px-4 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'>{isSignUp ? 'Signup' : 'Login'}</button>
          </form>
          <div className="mt-4 text-center text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button onClick={toggleSection} className="text-indigo-500 hover:text-indigo-700 hover:underline ml-1">
              {isSignUp ? 'Login' : 'Signup'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
