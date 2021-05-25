const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// Import and set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
       await builder.build();
    } else {
        await nuxt.ready();
    }
    // Render every route with Nuxt.js
    app.use(nuxt.render);

    // Listen
    app.listen(port, host);

    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}

start();

app.get('/isAlive', async (req, res) => {
    res.send('i am alive');
});

app.get('/posts', async(req, res) => {
    posts = [
        {text: "POST 1", id: 1},
        {text: "POST 2", id: 2},
        {text: "POST 3", id: 3},
        {text: "POST 4", id: 4},
        {text: "POST 5", id: 5}
    ]
    res.send(posts);
})