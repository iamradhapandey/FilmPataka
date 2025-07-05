import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import Sidenav from "./Sidenav";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);

      setsearches(data.results);
    } catch (error) {
      console.log("Error :" + error);
    }
  };

  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div className="w-[80%]  h-[10vh] relative flex mx-auto  items-center">
      <i className=" max-sm:text-xl text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="max-sm:w-full w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-400  "
        type="text"
        placeholder="Search anything"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="max-sm:text-xl  absolute right-0 text-zinc-400 text-3xl ri-close-fill"
        ></i>
      )}

      <div className="max-sm:w-full  z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto left-[6%] rounded">
        {searches.map((s, i) => (
          <Link
          to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className=" hover:text-black hover:bg-zinc-300 duration-200  font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100  "
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {s.title || s.name || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
