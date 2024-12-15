import React, { Fragment, useState } from 'react';
import login_img from "../../assets/login-img.png";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { Toast } from '../../components/ui';

const initialState = { email: "", password: "", };

function Login() {

  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        Toast({ type: 'success', message: data?.payload?.message });
      } else {
        Toast({ type: 'warn', message: data?.payload?.message });
      }
    }).catch((error) => {
      Toast({ type: 'error', message: 'An error occurred' });
    });
  };


  return (
    <Fragment>
      <div className="flex md:flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full h-fit hidden md:block rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <img className="border rounded-lg h-full w-full" src={login_img} alt="login-img" />
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-[#eb918f] md:text-2xl">Sign in to your account</h1>
            <form className="space-y-4" onSubmit={loginHandler}>
              <div>
                <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block outline-none w-full md:h-12 h-11 p-2.5" placeholder="name@company.com" value={formData.email} onChange={changeHandler} required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900">Password</label>
                <div className='flex items-center'>
                  <input type={showpassword ? 'text' : "password"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg border-r-0 rounded-r-none block outline-none w-full md:h-12 h-11 p-2.5" value={formData.password} onChange={changeHandler} required />
                  <button className='inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg border-l-0 rounded-l-none w-auto md:h-12 h-11 p-2.5' onClick={(e) => { e.preventDefault(); setShowpassword(!showpassword); }}><lord-icon src='https://cdn.lordicon.com/dicvhxpz.json' trigger="hover" state={showpassword ? "hover-look-around" : "hover-lashes"} stroke="regular" colors="primary:#000000,secondary:#00000"></lord-icon></button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">Remember me</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-orange-400 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center">Sign in</button>
              <p className="text-base font-light text-gray-500">Don't have an account yet? <Link to="/auth/signup" className="font-medium text-[#eb918f] hover:underline">Sign up</Link></p>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
