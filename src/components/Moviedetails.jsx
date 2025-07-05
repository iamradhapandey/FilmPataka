import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../partials/HorizontalCards";

const Moviedetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info?.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top 10%",
      }}
      className="relative w-screen overflow-y-auto max-sm:overflow-x-hidden px-[10%]"
    >
      {/* Part 1: Navigation */}
      <nav className="w-full h-[11vh] items-center text-zinc-100 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="text-2xl ml- hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={info.detail.homepage}
        >
          <i className="ri-external-link-fill"></i>
        </a>

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
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDb
        </a>
      </nav>

      {/* Part 2: Poster and Details */}
      <div className="max-sm:flex-col w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]  h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info?.detail.poster_path || ""
          }`}
          alt="Poster"
        />

        <div className="ml-[5%]  text-white">
          <h1 className="text-5xl font-black">
            {info?.detail.title ||
              info?.detail.name ||
              info?.detail.original_title ||
              info?.detail.original_name}
          </h1>
          <h2 className="text-xl font-semibold mt-2">
            {info?.detail.tagline || info?.detail.overview}
          </h2>

          <div className="flex gap-5 mt-2">
            <p>
              Release Date:{" "}
              {info?.detail.release_date || info?.detail.first_air_date}
            </p>{" "}
            |<p>Rating: {(info?.detail.vote_average || 0) * 1}/10</p> |
            <p>Genres: {info?.detail.genres?.map((g) => g.name).join(", ")}</p>{" "}
            |<p>Popularity: {info?.detail.popularity || 'No Data'}</p> |
            <p>Budget: {info?.detail.budget || 'No Data'}</p>
          </div>

          <h1 className="text-2xl mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mb-3 mt-5">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>

          {/* Trailer Link */}
            <Link 
            className="text-xl rounded-lg p-5 bg-[#6556CD]"
            to={`/movie/details/${id}/trailer`}>
               <i className="ri-play-fill mr-3"></i>
               Play Trailer
            </Link>
        </div>
      </div>

      {/* Part 3: Available on Platforms */}
      <div className="w-[80%] max-sm:overflow-x-auto flex flex-col gap-y-5 mt-10 ">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available for Rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4: Recommendations */}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
      <h1 className="text-3xl max-sm:text-xl font-bold text-white">
        Recommendations & Similar Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
