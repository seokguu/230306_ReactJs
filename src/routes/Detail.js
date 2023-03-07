import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Movie from '../components/Movie';
import styles from '../routes/Detail.module.css';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setMovies(json.data.movie);
    console.log(movies);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.detail}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img
            src={movies.background_image}
            className={styles.detail__background_image}
          />
          <div className={styles.detail__content}>
            <img
              src={movies.medium_cover_image}
              className={styles.detail__img}
            />
            <h1>
              {movies.title} {movies.year}
            </h1>
            <h3>
              <ul>
                {movies.description_intro.length > 235
                  ? `${movies.description_intro.slice(0, 235)}...`
                  : movies.description_intro}
              </ul>
              <ul>Genres: {movies.genres}</ul>
              <ul>Running Time: {movies.runtime} minuite</ul>
              <ul>
                Download Link: <a href={movies.url}>Clcik</a>
              </ul>
            </h3>
            <h3>
              <Link to={`/`}>Home</Link>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
