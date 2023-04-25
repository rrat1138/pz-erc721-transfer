const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { transfer } = require('./transferFunction.js');

app.use(bodyParser.json());

// Endpoint for receiving data via POST request
app.post('/transfer-tokens', async (req, res) => {
const { contractAddress, recipientAddress, tokenAmount, tokenMetadata1 } = req.body;
  try {
    const result = await transfer(tokenAmount, recipientAddress, contractAddress, tokenMetadata1);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
