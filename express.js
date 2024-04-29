const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const xlsx = require('xlsx');

// Middleware
app.use(bodyParser.json());

// Store transcriptions in memory (for simplicity)
let transcriptions = [];

// Endpoint to save transcription to Excel
app.post('/save', (req, res) => {
  const data = req.body.transcription;
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(data);

  xlsx.utils.book_append_sheet(wb, ws, 'Transcriptions');
  xlsx.writeFile(wb, 'transcriptions.xlsx');
  
  res.send('Transcriptions saved to Excel');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
