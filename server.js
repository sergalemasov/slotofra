const express = require('express');
const {join} = require('path');

const PORT = process.env.PORT || 5000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const app = express();

app.get('*.*', express.static(DIST_FOLDER));

app.get('/', (_req, res) => {
    res.sendFile(join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
