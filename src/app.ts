import mongoose, { Schema, model, connect } from 'mongoose';

import express from "express";
import connectDb from './services/mongoose';

const app = express();

connectDb().catch(err => console.log(err))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// 3. Create a Model.
const User = mongoose.model<IUser>('Uuuuser', userSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect(process.env.DATABASE_URI as string);

  
  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
  });
  await user.save();

  console.log(user.email); // 'bill@initech.com'
}



app.post('/user', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    const result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error});
  }
});


export default app
