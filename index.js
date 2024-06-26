const express = require("express");
const model = require("./model");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

//pets
app.get("/pets", async (request, response) => {
  try {
    let petAs = await model.PetA.find();
    response.json(petAs);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});

app.post("/pets", async (request, response) => {
  const data = request.body;
  try {
    let newPetA = new model.PetA({
      name: data.name,
      species: data.species,
      breed: data.breed,
      age: data.age,
      gender: data.gender,
    });
    let error = newPetA.validateSync();
    if (error) {
      response.status(400).json(error);
      return;
    }
    await newPetA.save();
    response.status(201).json(newPetA);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});
app.get("/pets/:id", async (request, response) => {
  try {
    let petA = await model.PetA.findById(request.params.id);
    if (!petA) {
      response.status(404).send("Could not find pet");
      return;
    }
    response.json(petA);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});

//application

app.get("/applications", async (request, response) => {
  try {
    let application = await model.Application.find();
    response.json(application);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});

app.post("/applications", async (request, response) => {
  const data = request.body;
  try {
    let newApplication = new model.Application({
      name: data.name,
      phone: data.phone,
      email: data.email,
      petId: data.petId,
    });
    let error = newApplication.validateSync();
    if (error) {
      response.status(400).json(error);
      return;
    }
    await newApplication.save();
    response.status(201).json(newApplication);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});
app.get("/applications/:id", async (request, response) => {
  try {
    let application = await model.Application.findById(request.params.id);
    if (!application) {
      response.status(404).send("Could not find application");
      return;
    }
    response.json(application);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});

// start your server on a port
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
