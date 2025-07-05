import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/Dropdown";

const Persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  return info ? (
    <div className="px-[10%] py-[1%] w-screen bg-[#1F1E24] flex flex-col">
      {/* Part 1: Navigation */}
      <nav className="h-[10vh] w-full items-center text-zinc-100 flex gap-10 mb-5 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="text-2xl ml- hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* Part 2: left poster and details */}

        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || ""
            }`}
            alt="Poster"
          />
          <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />

          {/* Part 3: social Media Links */}
          <div className="text-xl text-white flex gap-x-5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Info */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info{" "}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className=" text-zinc-400">
            {" "}
            {info.detail.known_for_department}{" "}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-400">
            {" "}
            {info.detail.gender === 2 ? "Male" : "Female"}{" "}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className=" text-zinc-400"> {info.detail.birthday} </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">DeathDay</h1>
          <h1 className=" text-zinc-400">
            {" "}
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}{" "}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400"> {info.detail.place_of_birth} </h1>
        </div>

        {/* Part 3: right details and info */}
        <div className="w-[80%] ml-5 ">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}{" "}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Biography
          </h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="text-lg text-zinc-400 font-semibold mt-5">Summary</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between v">
            <h1 className="text-xl text-zinc-400 font-semibold mt-5">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="list-disc mb-5 text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5   mt-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white cursor-pointer p-5 hover:bg-[#19191d] duration-300 ">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {" "}
                    {c.title || c.name || c.original_title || c.original_name}
                  </span>
                  <span className="block ml-5"> {c.character && `Character Name : ${c.character}`} </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;
