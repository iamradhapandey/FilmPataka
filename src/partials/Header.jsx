import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ data }) => {

  const [overviewLength, setOverviewLength] = useState(200);

  useEffect(() => {
    const updateOverviewLength = () => {
      if (window.innerWidth <= 640) { // 640px is the breakpoint for small screens (sm)
        setOverviewLength(100);
      } else {
        setOverviewLength(200);
      }
    };

    updateOverviewLength();
    window.addEventListener("resize", updateOverviewLength);

    return () => {
      window.removeEventListener("resize", updateOverviewLength);
    };
  }, []);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path || ""
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top 10%",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="max-sm:text-2xl  w-[100%] text-5xl font-black text-white">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] mt-3 mb-3 text-white">
      {data.overview.slice(0, overviewLength)}... 
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No Information"}
        <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      
      <Link to={`/${data.media_type}/details/${data.id}`} className="bg-[#6556CD] p-4 rounded text-white  mt-5">Watch Trailer</Link>
    </div>
  );
};

export default Header;
