import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  return (
        <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 bg-[#D0CFD0] border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div
              className="mr-4 block cursor-pointer py-1.5 font-sans text-3xl font-bold"
            >
              INotes <span className='font-medium text-gray-700 text-xs'>your notes on the cloud</span>
            </div>
            <ul className=' flex flex-row items-center cursor-pointer justify-between ml-[40rem] gap-x-[5rem] font-sans font-bold text-xl text-center align-middle '>
              <li 
              onClick={()=>navigate('/home')}>
                Home      
              </li>
              <li
              onClick={()=>navigate('/about')}>
                About      
              </li>
            </ul>
              <div className="flex items-center gap-x-1">
                <button
                  className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                  onClick={() => navigate(`/login`)}
                >
                  <span>Log In</span>
                </button>
                <button
                  className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                  onClick={() => navigate(`/signup`)}
                >
                  <span>Sign up</span>
                </button>
              </div>
            
          </div>
        </nav>
    //   </div>
    // </div>
  );
}
