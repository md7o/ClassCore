import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import moment from "moment";
import User from "./models/user";

const app = express();
app.use(
  cors({
    origin: "https://classcore.onrender.com",
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

    checkAndInsertStaticUsers();
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

const staticUsers = [
  {
    name: "John Doe",
    birth: "01/01/2000",
    college: "College A",
    country: "USA",
    status: "Active",
    phone: "1234567890",
  },
  {
    name: "Jane Smith",
    birth: "02/02/1995",
    college: "College B",
    country: "Canada",
    status: "Active",
    phone: "9876543210",
  },
  {
    name: "Jim Brown",
    birth: "03/03/1990",
    college: "College C",
    country: "UK",
    status: "Active",
    phone: "5551234567",
  },
  {
    name: "Jill White",
    birth: "04/04/1992",
    college: "College D",
    country: "Australia",
    status: "Active",
    phone: "5559876543",
  },
];

const checkAndInsertStaticUsers = async () => {
  const existingUsers = await User.find({});

  // Insert static users if the database is empty or if the users don't exist
  for (const staticUser of staticUsers) {
    const userExists = existingUsers.some(
      (user) => user.name === staticUser.name
    );
    if (!userExists) {
      const formattedBirth = moment(staticUser.birth).format("MM/DD/YYYY");
      const newUser = new User({
        name: staticUser.name,
        birth: formattedBirth,
        college: staticUser.college,
        country: staticUser.country,
        status: staticUser.status,
        phone: staticUser.phone,
      });

      await newUser.save();
      console.log(`Inserted static user: ${staticUser.name}`);
    }
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
    const { name, birth, college, country, status, phone } = req.body;

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
    const { id } = req.params;
    const user = await User.findById(id);

    // Prevent deleting static users
    if (
      user &&
      staticUsers.some((staticUser) => staticUser.name === user.name)
    ) {
      return;
    }

    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `User with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the user", error });
  }
});

// ====UPDATE USER ENDPOINT====
app.patch("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // Prevent updating static users
    if (
      user &&
      staticUsers.some((staticUser) => staticUser.name === user.name)
    ) {
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

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
