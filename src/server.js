const express = require('express');
const app = express();
const { transfer } = require('./transferFunction.js');


app.use(express.json());

// Endpoint for receiving data via query parameters
app.get('/transfer-tokens/:contractAddress/:recipientAddress/:tokenAmount/:tokenMetadata', async (req, res) => {
  const { contractAddress, recipientAddress, tokenAmount } = req.params;
const tokenMetadata = decodeURIComponent(req.params.tokenMetadata);
const tokenMetadata1 = JSON.parse(tokenMetadata);
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