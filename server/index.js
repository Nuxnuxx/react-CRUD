const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createPool({
    host:   'localhost',
    user:   'root',
    password: 'password',
    database: 'CRUDDatabase'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * from movie_reviews;"
    db.query(sqlSelect, (err,result) => {
        res.send(result)
    })
})
app.post("/api/insert", (req,res) => {

    const movieName  = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews (movie_name,movie_reviewscol) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReview], (err,result) => {
        console.log(err)
    })
})

app.delete('/api/delete/:movie', (req,res) => {
    const name = req.params.movie
    const sqlDelete = "DELETE FROM movie_reviews WHERE movie_name = ?"
    db.query(sqlDelete, name, (err,result) => {
        if (err) console.log(err);
    })
})

app.listen("3001", () => {
    console.log('Listening in port 3001');
});

