const Post = require('./models/post');
const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const mongoose = require('mongoose');

// Import and set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

// Init Nuxt.js
const nuxt = new Nuxt(config);
const { host, port } = nuxt.options.server;

async function start() {
    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
       await builder.build();
    } else {
        await nuxt.ready();
    }
    // Render every route with Nuxt.js
    app.use(nuxt.render);

    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}

start();

// connection string to connect to mongodb
const dbURI = 'mongodb+srv://mganz:ndj@mena@hors-service.fkwno.mongodb.net/hors-service?retryWrites=true&w=majority';
mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log(`connected to db`);
        app.listen(port, host); // listen
        }
    )
    .catch(err => console.log(err));

app.get('/isAlive', async (req, res) => {
    res.send('i am alive');
});

app.get('/testSave', (req, res) => {
    const post = new Post({
        body: 'Fifth post in DB'
    });
    post
        .save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
});

app.get('/posts', (req, res) => {
    Post
        .find()
        .sort({createdAt: -1})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
})