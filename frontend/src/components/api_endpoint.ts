// const express = require("express");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const app = express();

// app.use(bodyParser.json());

// const users = []; // Replace with your user database

// app.post("/api/signin", async (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find((user) => user.email === email);
//   if (!user) {
//     return res.status(401).json({ error: "Invalid email or password" });
//   }

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     return res.status(401).json({ error: "Invalid email or password" });
//   }

//   // Generate a JWT token
//   const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
//     expiresIn: "1h",
//   });

//   res.json({ token });
// });

// app.listen(3001, () => console.log("Server running on port 3001"));
