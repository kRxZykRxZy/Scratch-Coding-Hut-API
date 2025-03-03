const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Wiki = mongoose.model('Wiki', wikiSchema);

app.get('/api/wikis', async (req, res) => {
  const wikis = await Wiki.find();
  res.json(wikis);
});

app.post('/api/wikis', async (req, res) => {
  const newWiki = new Wiki(req.body);
  await newWiki.save();
  res.json(newWiki);
});

app.put('/api/wikis/:id', async (req, res) => {
  const updatedWiki = await Wiki.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedWiki);
});

app.delete('/api/wikis/:id', async (req, res) => {
  await Wiki.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
