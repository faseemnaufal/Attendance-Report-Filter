const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/attendance', async (req, res) => {
  try {
    const apiUrl = 'https://grand-kandyan.herokuapp.com/apiv1.0/attendance/monthly-raw-report/?year=2024&month=1&department=1';
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
