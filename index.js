import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config.js";
import userRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import swaggerUi from  'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

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


// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Time to document that Express API you built",
      version: "1.0.0",
      description:
        "A test project to understand how easy it is to document and Express API",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "Info@SmartBear.com"
      }
    },
    servers: [
      {
        url: "https://backend-saralanches.herokuapp.com/"
      }
    ]
  },
  apis: ["./models/User.js","./models/Food.js", "./routes/userRoutes.js","./routes/foodRoutes.js"]
};
const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

app.use('/users', userRoutes)

app.use('/foods',foodRoutes)

app.listen(process.env.PORT || PORT, () => {
  console.log(`O servidor foi iniciado na porta ${PORT}!`);
});
