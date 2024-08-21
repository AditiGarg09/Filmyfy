import { CDN_images } from "../utils/constants";

const MovieCard = (props) => {
  const { original_title, poster_path, vote_average, release_date } =
    props.mData;

  return (
    <>
      <div className="mContainer">
        <div className="movieImg">
          <img src={CDN_images + poster_path} height="130px" width="190" />
        </div>
        <div className="movieName">
          <h3 title={original_title}>{original_title}</h3>
        </div>
        <div className="movieFooter">
          <h4>
            <span className="fa fa-star checked"></span> {vote_average}
          </h4>
          <h4 className="movieTime">{release_date}</h4>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
