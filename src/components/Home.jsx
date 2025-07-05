import { useEffect, useState } from "react";
import Sidenav from "../partials/Sidenav";
import Topnav from "../partials/Topnav";
import axios from "../utils/axios";
import Header from "../partials/Header";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "PrimeMax | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all")

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      const randomData =
        data.results[Math.floor(Math.random() * data.results.length)];

      setWallpaper(randomData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      settrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  useEffect(() => {
    if (!wallpaper) {
      GetHeaderWallpaper();
    };
          GetTrending();
  }, [category]);

  
  

  return wallpaper && trending  ? (
    <>
      <Sidenav />
      <div className=" max-sm:w-full w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="max-sm:gap-28 flex justify-between p-5">
        <h1 className="max-sm:text-xl text-3xl  font-bold  text-zinc-200 ">Trending</h1>
        
        
        <Dropdown title="Filter" options={["tv",'movie','all']}  func={(e)=> setcategory(e.target.value)} />
      </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );


  
}

export default Home;
