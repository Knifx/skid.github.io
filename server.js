const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', async (req, res) => {
    const { query } = req.query;
    const apiUrl = `https://skidkaonline.ru/apiv3/products/?limit=30&offset=0&shop_id=9&city_id=72&fields=id,name,name2,shops_ids,url,noted,discount_url,discount_name,date,notalladdr,image336,imagefull,brands,pricebefore,priceafter,discount_type,discount,externalurl,countPlus,countMinus,comments,desc,color,daystitle,liked,started_today,published_today&query=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
