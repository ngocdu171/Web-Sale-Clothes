const express = require('express');
const app = express();
const port = 5000;
const data = require('./data.json');

const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

const saltRound = 4;

app.use(bodyParser.json());
app.use(cors());

passport.use(new Strategy((email, password, cb) => {
    db.query('SELECT id, username, email, password FROM users WHERE email = ?', [email])
    .then(dbResults => {
        if(dbResults.length == 0)
        {
            return cb(null, false);
        }

        bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
            if(bcryptResult == true)
            {
                cb(null, dbResults[0]);
            }
            else
            {
                return cb(null, false);
            }
        })
    }).catch(dbError => cb(err))
}))

app.get('/users', function (req, res) {
  db.query('SELECT * From users').then(results => {
      res.json(results);
  })
})

app.get('/products', function (req, res) {
    res.send(data.products);
    // res.send("data.products");
})
app.get('/products/:id', function (req, res) {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId)
    if(product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: "product is not found."});
    }
})

//////////////Register//////////////
app.post('/register', (req, res) => {
    let username = req.body.username.trim();
    let email = req.body.email.trim();
    let password = req.body.password.trim();
    if((typeof username === "string") && (username.length > 5) &&
        (typeof email === "string") && (email.length > 5 && email.length < 61) &&
        (typeof password === "string") && (password.length > 5)) {
            bcrypt.hash(password, saltRound).then(hash =>
                db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, hash])
            )
            .then(dbResults => {
                console.log(dbResults);
                res.send({message: "Create Success!"});
                res.sendStatus(201);
            })
            .catch(error => res.sendStatus(500));
        }
    else {
        res.send({message: "both must be string, username and password must be more than 6 characters long"});
        res.sendStatus(400);
    }
})

//////////////Signin//////////////
// app.post('/signin', passport.authenticate('basic', {session: false}),
//     (req, res) => {
//         db.query('SELECT id, email FROM users WHERE email = ?', [req.params.email])
//         .then(results => {
//             res.json(results);
//             console.log(results);
//     })
// })

// app.post('/signin/:email', passport.authenticate('basic', {session: false}),
//     (req, res) => {
//         db.query('SELECT id, email FROM users WHERE email = ?', [req.params.email])
//         .then(results => {
//             res.json(results);
//             console.log(results);
//     })
// });

app.get('/signin/:email', passport.authenticate('basic', {session: false}),
    (req, res) => {
        db.query('SELECT id, username, email FROM users WHERE email = ?',
        [req.params.email])
        .then (results => {
            res.json(results);
            console.log(results);
        })
});

/* DB init */
Promise.all(
    [
        db.query(`CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(32) UNIQUE,
            email VARCHAR(80),
            password VARCHAR(256)
        )`),
        // db.query(`CREATE TABLE IF NOT EXISTS cart(
        //     id INT,
        //     username VARCHAR(32),
        //     date VARCHAR(55),
        //     location VARCHAR(55),
        //     energy FLOAT(3) DEFAULT '0',
        //     money FLOAT(3)
        // )`)
    ]
  ).then(() => {
    console.log('database initialized');
    app.listen(port, () => {
        console.log(`Example API listening on http://localhost:${port}\n`);
    });
  })
  .catch(error => console.log(error));