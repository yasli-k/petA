const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DBPASSWORDS);

const petASchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet must have a name"],
    },
    species: {
      type: String,
      required: [true, "Pet must have a species"],
    },
    breed: {
      type: String,
      required: [true, "Pet must have a breed"],
    },
    age: {
      type: Number,
      required: [true, "Pet must have an age"],
    },
    gender: {
      type: String,
      required: [true, "Pet must gender"],
    },
  },
  { timestamps: true }
);

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Applicant must have a name"],
    },
    phone: {
      type: Number,
      required: [true, "Applicant must have a phone number"],
    },
    email: {
      type: String,
      required: [true, "Applicant must have an email"],
    },
    petId: {
      type: Number,
      required: [true, "Applicant must have a petId"],
    },
  },
  { timestamps: true }
);

const PetA = mongoose.model("petASchema", petASchema);

const Application = mongoose.model("applicationSchema", applicationSchema);
module.exports = { Application: Application, PetA: PetA };
