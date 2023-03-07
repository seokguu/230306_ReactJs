import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Movie from '../components/Movie';

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
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movies.medium_cover_image} />
          <hr />
          <h2>
            {movies.title} {movies.year} ({movies.rating})
          </h2>
          <h3>
            장르: {movies.genres}
            <br />
            Running Time: {movies.runtime}분
            <br />
            Description : {movies.description_intro}
            <br />
            다운로드 링크: <a href={movies.url}>Clcik</a>
          </h3>
          <h3>
            <Link to={`/`}>Return to Home</Link>
          </h3>
        </div>
      )}
    </div>
  );
}

export default Detail;
