import React from 'react';
import errorPage from "../../assets/Error-page.png";

function Page404() {
  return (
    <section className='bg-gray-50'>
      <div className="p-5 font-inter flex items-center justify-center">
        <div className="p-6 bg-white flex flex-col items-center w-full max-w-xl rounded-3xl shadow-lg overflow-hidden md:p-10">
          <div className="w-56">
            <img className="w-full" src={errorPage} alt="error" />
          </div>
          <div className="text-center space-y-4 mt-4">
            <div className="font-medium text-lg md:text-2xl">OOPS! PAGE NOT FOUND</div>
            <p className="text-sm md:text-base text-gray-400 px-4 md:px-0">The Page you are loking for doesn't exist</p>
            <div className="text-center mt-4">
              <button type="button" className="text-sm md:text-base rounded-lg text-white font-light w-36 h-14 bg-orange-400 hover:bg-orange-500" onClick={() => { window.location.replace('/'); }}>Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page404;
