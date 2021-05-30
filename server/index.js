if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
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

const username = process.env.username;
const pwd = process.env.pwd;
const server = process.env.server;
const db = process.env.db;

const dbURI = `mongodb+srv://${username}:${pwd}@${server}/${db}?retryWrites=true&w=majority`;

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

mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
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