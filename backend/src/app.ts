import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import moment from "moment";
import User from "./models/user";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://classcorewebsite.web.app",
  })
);

app.use(express.json());

// ====CONNECT TO DATABASE====
mongoose
  .connect(
    "mongodb+srv://md7ohe:%23Mdho123%23@classcore.mqjmg.mongodb.net/?retryWrites=true&w=majority&appName=ClassCore"
  )
  .then(async () => {
    console.log("Connected successfully :)");

    await seedDatabase();
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

const staticUsers = [
  {
    name: "John Doe",
    birth: "01/15/1990",
    college: "Harvard University",
    country: "USA",
    status: "active",
    phone: "123-456-7890",
  },
  {
    name: "Jane Smith",
    birth: "03/22/1985",
    college: "Stanford University",
    country: "USA",
    status: "inactive",
    phone: "987-654-3210",
  },
  {
    name: "Carlos Ruiz",
    birth: "07/10/1992",
    college: "University of Madrid",
    country: "Spain",
    status: "active",
    phone: "555-666-7777",
  },
  {
    name: "Amira Khalid",
    birth: "09/05/1988",
    college: "Cairo University",
    country: "Egypt",
    status: "active",
    phone: "444-333-2222",
  },
];

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      for (const userData of staticUsers) {
        // Convert birth date string to a Date object
        const formattedBirth = moment(userData.birth, "MM/DD/YYYY").toDate();
        const newUser = new User({ ...userData, birth: formattedBirth });
        await newUser.save();
      }
      console.log("Database seeded with static users.");
    } else {
      console.log("Database already contains users, skipping seeding.");
    }
  } catch (error) {
    console.log("Error seeding the database", error);
  }
};

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
