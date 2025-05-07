const express = require('express');
const cors = require('cors');
const { getEuroPrice, scrapeEuroPrice } = require('../immigration-site/euro-scraper/scrape');


const app = express();
const port = 3001;


const cron = require('node-cron');

cron.schedule('0 */3 * * *', () => {
    console.log('Running the euro price scraper...');
    scrapeEuroPrice(); 
});



app.use(cors());

app.get('/api/euro-price', async (req, res) => {
  try {
    const price = await getEuroPrice();
    if (price) {
      res.json({ price });
    } else {
      res.status(500).json({ error: 'Euro price not found' });
    }
  } catch (error) {
    console.error('Error fetching euro price:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Euro price API running at http://localhost:${port}/api/euro-price`);
});
