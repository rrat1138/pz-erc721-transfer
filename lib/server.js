const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {
  transfer
} = require('./transferFunction.js');
app.use(bodyParser.json());

// Endpoint for receiving data via POST request
app.post('/transfer-tokens', async (req, res) => {
  const {
    contractAddress,
    recipientAddress,
    tokenAmount,
    _data
  } = req.body;
  try {
    const result = await transfer(tokenAmount, recipientAddress, contractAddress, _data);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});