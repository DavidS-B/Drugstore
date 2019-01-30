const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost/Drugstore",
  { useNewUrlParser: true }
);

const Drugs = mongoose.model("Drugs", {
  name: {
    type: String,
    default: ""
  },
  quantity: {
    type: Number
  }
});

/* ============> Read Inventory <============ */
app.get("/", async (req, res) => {
  const drugTab = await Drugs.find();
  res.json(drugTab);
});

/* ============> Create New Drug <============ */
app.post("/create", async (req, res) => {
  Drugs.countDocuments({ name: req.body.name }, function(err, count) {
    if (count > 0) {
      return res.json({
        error: {
          message: "Drug already exists"
        }
      });
    } else if (req.body.name === undefined) {
      res.json({
        error: {
          message: "Drug name not valid"
        }
      });
    } else if (req.body.quantity === undefined) {
      const newDrug = new Drugs({
        name: req.body.name,
        quantity: 0
      });
      newDrug.save();
      res.json(newDrug);
    } else {
      const newDrug = new Drugs({
        name: req.body.name,
        quantity: req.body.quantity
      });
      newDrug.save();
      res.json(newDrug);
    }
  });
});

/* ============> Add to Drug Stock ("quantity") <============ */
app.post("/drugs/add", async (req, res) => {
  try {
    Drugs.countDocuments({ _id: req.body.id }, function(err, count) {});
    const drug = await Drugs.findOne({ _id: req.body.id });
    if (req.body.id && req.body.quantity && req.body.quantity > 0) {
      drug.quantity = drug.quantity + req.body.quantity;
      await drug.save();
      var query = Drugs.where({ _id: req.body.id });
      query.findOne(function(err, drug) {
        if (err) return handleError(err);
        if (drug) {
          res.send(drug);
        }
      });
    } else if (
      (req.body.id && req.body.quantity && req.body.quantity < 1) ||
      req.body.quantity === 0
    ) {
      res.status(400).json({
        error: {
          message: "Invalid quantity"
        }
      });
    } else if (req.body.id === undefined || req.body.quantity === undefined) {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    return res.status(400).json({
      error: {
        message: "Bad request"
      }
    });
  }
});

/* ============> Remove to Drug Stock ("quantity") <============ */
app.post("/drugs/remove", async (req, res) => {
  try {
    const drug = await Drugs.findOne({ _id: req.body.id });
    if (
      req.body.id &&
      req.body.quantity &&
      req.body.quantity <= drug.quantity
    ) {
      drug.quantity = drug.quantity - req.body.quantity;
      await drug.save();
      var query = Drugs.where({ _id: req.body.id });
      query.findOne(function(err, drug) {
        if (err) return handleError(err);
        if (drug) {
          res.send(drug);
        }
      });
    } else if (
      req.body.id &&
      req.body.quantity &&
      req.body.quantity > drug.quantity
    ) {
      res.status(400).json({
        error: {
          message: "Invalid quantity"
        }
      });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    return res.status(400).json({
      error: {
        message: "Bad request"
      }
    });
  }
});

/* ============> Show Drug Quantity <============ */
app.post("/drugs/quantity", async (req, res) => {
  let query = Drugs.find({ name: req.body.name });
  query.findOne(function(err, drug) {
    if (err) return handleError(err);
    if (drug) {
      res.send(drug);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
