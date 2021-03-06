require("dotenv").config();
const express = require("express");
const app = express();
const port = 3508;
app.use(express.json());
const { Pool } = require('pg');
const cors = require('cors');
app.use(cors());

const pool = new Pool({
    // connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false
    // }
    connectionString: process.env.DATABASE_URL,
    ssl: {
       rejectUnauthorized: false,
    }
  });

//get specs by ASIN
app.get ("/specs/:id", async (req, res) => {
var id = req.params.id;
    try {
        let client = await pool.connect();
        const data = await client.query(`SELECT * FROM product_specs WHERE asin_id = '${id}';`);
        res.json(data.rows);
        client.release();
    }

    catch (err) {
        console.log("ERROR!")
    }

});

app.listen(port, () => console.log(`Server is running on ${port}!`));
