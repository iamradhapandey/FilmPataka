import { useEffect } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom"

function Sidenav() {

  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-200 p-10 max-sm:hidden ">
         <h1 className="text-2xl text-white font-bold mr-3">
         <i className= " text-[#6556CD] ri-tv-fill"></i>
          <span className="text-2xl">PrimeMax</span> 
         </h1>

         <nav className="flex flex-col text-zinc-400 text-xl gap-3">
         <h1 className="text-white font-semibold text-xl mt-8 mb-5">New Feeds</h1>
         <Link  to='/trending' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 '  > <i className="mr-2 ri-fire-fill"></i> Trending</Link>
         <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ' > <i className="mr-2 ri-bard-fill"></i> Popular</Link>
         <Link to='/movie' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ' > <i className="mr-2 ri-movie-2-ai-fill"></i> Movies</Link>
         <Link to='/tv' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ' > <i className="mr-2 ri-slideshow-3-fill"></i> Tv Shows</Link>
         <Link to='/person' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ' ><i className="mr-2 ri-team-fill"></i> People</Link>
         </nav>

         <hr className="bg-none h-[1px] mt-[5px] bg-zinc-400" />

         <nav className="flex flex-col text-zinc-400 text-xl gap-3">
         <h1 className="text-white font-semibold text-xl mt-10 mb-5">Website Information</h1>
         <Link  className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 '  > <i className="mr-2 ri-information-fill"></i> About</Link>
         <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ' > <i className="mr-2 ri-phone-fill"></i> Contact</Link>

         </nav>
    </div>
  )
}
  
export default Sidenav