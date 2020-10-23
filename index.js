import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config.js";
import userRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js'

const PORT = 5000;

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Você está conectado no banco!");
  } catch (error) {
    console.log("Não foi possível conectar ao banco " + error);
  }
})();

const app = express();

app.use(cors());

app.use(express.json())

app.use('/users', userRoutes)

app.use('/foods',foodRoutes)

app.listen(process.env.PORT || PORT, () => {
  console.log(`O servidor foi iniciado na porta ${PORT}!`);
});
