import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] max-sm:h-[45%] flex overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? data.map((d, i) => (
        <Link
          to={`/${d.media_type}/details/${d.id}`} // Note the leading slash here to prevent appending
          key={i}
          className="max-sm:min-w-[50%]  min-w-[15%] bg-zinc-900 mr-5 mb-5"
        >
          <img
            className="w-full h-[45%] object-cover"
            src={d?.backdrop_path || d?.poster_path ? `https://image.tmdb.org/t/p/original/${d?.backdrop_path || d?.poster_path || ""}`: noimage  }
            alt=""
          />

          <div className="h-[55%] text-white p-3 overflow-auto">
            <h1 className="text-xl font-semibold">
              {d.title || d.name || d.original_name || d.original_title}
            </h1>
            <p className="text-sm">
              {d.overview.slice(0, 30)}...
              <span className="text-zinc-500">more</span>
            </p>
          </div>
        </Link>
      )) : <h1 className="text-3xl text-white font-black text-center">Nothing to show</h1> }
    </div>
  );
};

export default HorizontalCards;
