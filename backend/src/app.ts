import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import moment from "moment";
import User from "./models/user";

const app = express();

app.use(
  cors({
    origin: "https://classcorewebsite.web.app", // Replace with your actual Firebase domain
  })
);

app.use(express.json());

// ====CONNECT TO DATABASE====
mongoose
  .connect(
    "mongodb+srv://md7ohe:%23Mdho123%23@classcore.mqjmg.mongodb.net/?retryWrites=true&w=majority&appName=ClassCore"
  )
  .then(() => {
    console.log("Connected successfully :)");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

// ====GET ALL USERS ENDPOINT====
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const formattedUsers = users.map((user) => ({
      ...user.toObject(), // Convert mongoose document to plain object
      birth: moment(user.birth).format("MM/DD/YYYY"), // Format birth date
    }));
    console.log("Fetched Users:", users); // Log the users retrieved from DB
    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

// ====GET USER BY ID ENDPOINT====
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return;
    }

    const formattedUser = {
      ...user.toObject(), // Convert mongoose document to plain object
      birth: moment(user.birth).format("MM/DD/YYYY"), // Format birth date
    };

    res.status(200).json(formattedUser);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user", error });
  }
});

// ====POST USER ENDPOINT====
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, birth, college, country, status, phone } = req.body; // Get data from request body

    const formattedBirth = moment(birth).format("MM/DD/YYYY");

    const newUser = new User({
      name,
      birth: formattedBirth,
      college,
      country,
      status,
      phone,
    });

    await newUser.save();
    res.status(201).json({ message: "User saved successfully!", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

// ====DELETE USER ENDPOINT====
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `User with ID ${req.params.id} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the user", error });
  }
});

// ====UPDATE USER ENDPOINT====
app.patch("/users/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating the user", error });
  }
});

// ==== START THE SERVER ====
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
