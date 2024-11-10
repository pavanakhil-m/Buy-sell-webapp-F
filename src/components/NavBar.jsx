import { useState, useEffect } from 'react';

export const NavBar = ({onFormSelect, onProfileSelect}) => {
  const [isShrunk, setIsShrunk] = useState(false);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > window.innerHeight / 3);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`p-2 bg-slate-400 fixed left-1/2 transform transition-all duration-300 ease-in-out z-50 ${
          isShrunk
            ? '-translate-x-1/2 w-1/2 h-16 top-2 rounded-md' 
            : '-translate-x-1/2 w-[calc(100%-1rem)] h-16 top-1 rounded-sm' 
        }`}
      >
        <div className="flex justify-between mt-3">
          <div className="text-white pl-8">LOGO</div>
          <div className='flex '>
              <input type="Search" placeholder='Search input'/>
              <button className='bg-slate-100 rounded-xl w-8'>🔍</button>
              
          </div>
          <div><button>❤️</button></div>
          <div><button className='bg-slate-300 text-slate-700 rounded-lg w-16'
                       onClick={onFormSelect}>
                          SELL
                </button></div>
          {!isShrunk && <div ><button onClick={onProfileSelect}>{userName}</button></div>}
        </div>
      </div>

    
    </>
  );
};
