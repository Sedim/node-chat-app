//path join: https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_join_paths

const path = require('path'); //built in
const express = require('express');


const publicPath = path.join(__dirname, '../public'); //This eleminates the ../ path and makes it a clean path
const app = express();


app.use(express.static(publicPath));


app.get('/', function (req, res) {
  res.send('Hello World!')
})



app.listen(3000, function () {
  console.log('Chat app listening on port 3000!')
})
