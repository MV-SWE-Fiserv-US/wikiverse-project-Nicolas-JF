const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Article = require('./models/Article'); 

app.use(cors());
app.use(bodyParser.json());

app.get('/wiki', async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

app.get('/wiki/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    res.json(article);
});

app.post('/wiki', async (req, res) => {
    const { title, content, name, email, tags } = req.body;
    const newArticle = new Article({ title, content, name, email, tags });
    await newArticle.save();
    res.status(201).json(newArticle);
});

app.delete('/wiki/:slug', async (req, res) => {
    await Article.deleteOne({ slug: req.params.slug });
    res.status(204).send();
});

module.exports = app;
