const express = require('express')
const cors = require('cors');

const app = express();
const port = 3000;

let beers = [];

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/beer', (req, res) => {
    const beer = req.body

    console.log(beer)
    beers.push(beer)

    res.send('Beer is added to the database!')
});

app.get('/beers', (req, res) => {
    res.json(beers);
});

app.get('/beer/:id', (req, res) => {
    const id = req.params.id;

    console.log(typeof id);
    for (let beer of beers) {
        console.log(typeof beer.id);
        if (beer.id === id) {
            res.json(beer);
            return;
        }
    }

    res.status(404).send('Beer not found!');
});

app.delete('/beer/:id', (req, res) => {
    const id = req.params.id;

    beers = beers.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
    });

    res.send('Beer is deleted!');
});

app.post('/beer/:isbn', (req, res) => {
    const id = req.params.id;
    const newBeer = req.body;

    for (let i = 0; i < beers.length; i++) {
        let beer = beers[i]
        if (beer.id === id) {
            beers[i] = newBeer;
        }
    }

    res.send('Beer is edited!');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
