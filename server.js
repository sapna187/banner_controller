// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2'); // Use mysql2 instead of mysql
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL Database Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Sapna@60',
//   database: 'banner_db'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// // API endpoint to get banner data
// app.get('/banner', (req, res) => {
//   db.query('SELECT * FROM banner_settings LIMIT 1', (err, result) => {
//     if (err) {
//       console.error('Error fetching banner data:', err);
//       res.status(500).send(err);
//     } else {
//       res.json(result[0]);
//     }
//   });
// });

// // API endpoint to update banner data
// app.post('/banner', (req, res) => {
//   const { visibility, description, timer, link, backgroundImage } = req.body;
//   db.query(
//     'UPDATE banner_settings SET visibility = ?, description = ?, timer = ?, link = ?, backgroundImage = ? WHERE id = 1',
//     [visibility, description, timer, link, backgroundImage || ''],
//     (err) => {
//       if (err) {
//         console.error('Error updating banner data:', err);
//         res.status(500).send(err);
//       } else {
//         res.send('Banner settings updated successfully');
//       }
//     }
//   );
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "database-1.c2gzcf7ssngj.us-east-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "Sapna600",
  database: process.env.DB_NAME || "banner_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, "client/build")));

// API endpoint for banner data
app.get("/banner", (req, res) => {
  db.query("SELECT * FROM banner_settings LIMIT 1", (err, result) => {
    if (err) {
      console.error("Error fetching banner data:", err);
      res.status(500).json({ error: "Error fetching banner data" });
    } else {
      res.json(result[0]);
    }
  });
});

// API endpoint for updating banner data
app.post("/banner", (req, res) => {
  const { visibility, description, timer, link, backgroundImage } = req.body;
  db.query(
    "UPDATE banner_settings SET visibility = ?, description = ?, timer = ?, link = ?, backgroundImage = ? WHERE id = 1",
    [visibility, description, timer, link, backgroundImage || ""],
    (err) => {
      if (err) {
        console.error("Error updating banner data:", err);
        res.status(500).json({ error: "Error updating banner data" });
      } else {
        res.json({ message: "Banner settings updated successfully" });
      }
    }
  );
});

// Catch-all handler to serve the React app for any other routes (including /dashboard)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
