import { useState, useEffect } from "react";
import ShimmerCards from "./ShimmerCards";
import MovieCard from "./MovieCard";
import NotFound from "./notFound";
import { movieAPI } from "../utils/constants";

const Body = () => {
  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  let jsonData = [];
  const fetchData = async () => {
    const movieData = await fetch(movieAPI + page);
    jsonData = await movieData.json();
    setMovieList((prev) => [...prev, ...jsonData.results]);
    setFilteredMovieList((prev) => [...prev, ...jsonData.results]);
  };

  const handleInput = () => {
    setMovieList(movieList);

    const filteredMovie = movieList.filter((res) =>
      res?.original_title?.toLowerCase().includes(movieSearch.toLowerCase())
    );

    if (filteredMovie.length != 0) {
      setFilteredMovieList(filteredMovie);
    } else if (movieSearch != "") {
      setFilteredMovieList([]);
    } else {
      setFilteredMovieList(movieList);
    }
  };

  useEffect(() => {
    handleInput();
  }, [movieSearch]);

  const handleInfiteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiteScroll);
    return () => window.removeEventListener("scroll", handleInfiteScroll);
  }, []);

  return (
    <>
      <div id="body">
        <div className="filter">
          <div className="search">
            <input
              type="text"
              placeholder="Search Movie"
              className="searchInput"
              value={movieSearch}
              onInput={(ev) => {
                setMovieSearch(ev.target.value);
              }}
            />
            <button
              className="searchButton"
              onClick={() => {
                handleInput();
              }}
            >
              <i className="fa fa-search" />
            </button>
          </div>
          <div style={{ display: "flex", marginTop: "-3px" }}>
            <button
              onClick={() => {
                const newMovieList = movieList.filter(
                  (d) => d.vote_average >= 7
                );
                setFilteredMovieList(newMovieList);
              }}
              className="TopRated"
            >
              Top Rated
            </button>
            <button
              onClick={() => {
                setFilteredMovieList(movieList);
              }}
              className="TopRated"
              style={{ marginLeft: "2%" }}
            >
              All Movies
            </button>
          </div>
        </div>
        <div className="movieContainer">
          {movieList.length == 0 ? (
            <>
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
              <ShimmerCards />
            </>
          ) : filteredMovieList.length != 0 ? (
            filteredMovieList?.map((details, id) => (
              <MovieCard mData={details} key={id} />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default Body;
