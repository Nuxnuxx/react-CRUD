import {useState , useEffect} from "react";
import "./App.css";
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState("")
  const [review, setReview] = useState("")
  const [movieReviewList, setMovieList] = useState([])
  
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    })
  }, [])
  

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert",
     {movieName: movieName,
      movieReview: review
    });
      setMovieList([
        ...movieReviewList,
         {movie_name: movieName, movie_reviewscol: review},
      ])
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}` )
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">

        <label>Nom du film :</label>
        <input 
            type="text" 
            name="movieName" 
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />

        <label> Avis :</label>
        <input 
            type="text" 
            name="review" 
            onChange={(e) => {
              setReview(e.target.value);
            }}
         />

        <button onClick={submitReview}>Enregistrer</button>

        {movieReviewList.map((value) => {
          return (
              <div className="card" key={value.id}>
                <h1>{value.movie_name}</h1>
                <p>{value.movie_reviewscol}</p>

                <button onClick={() => {deleteReview(value.movie_name)}}>Delete</button>
                <input type="text" id="update-input"/>
                <button>Update</button>
              </div>)
        })}
      </div>
    </div>
  );
}

export default App;
