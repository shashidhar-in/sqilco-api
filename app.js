import request from "request";
import express from "express";
import bodyParser from "body-parser";
import pug from "pug";
import _ from "lodash";
import dotenv from "dotenv";
import path from "path";
import logger from "morgan";

import { Donor } from "./models/Donor.js";
import { paystack } from "./config/paystack.js";
import { currDir } from "./utils/index.js";

dotenv.config();

const { initializePayment, verifyPayment } = paystack(request);
const __dirname = currDir(import.meta.url);

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public/")));
app.set("view engine", pug);
app.use(logger("combined"));

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.post("/paystack/pay", (req, res) => {
  const form = _.pick(req.body, ["amount", "email", "fullName"]);
  form.metadata = {
    fullName: form.fullName,
  };
  form.amount *= 100;

  initializePayment(form, (error, body) => {
    if (error) {
      return res.redirect("/error");
    }
    const response = JSON.parse(body);
    res.redirect(response.data.authorization_url);
  });
});

app.get("/paystack/callback", (req, res) => {
  const ref = req.query.reference;
  verifyPayment(ref, (error, body) => {
    if (error) {
      return res.redirect("/error");
    }
    const response = JSON.parse(body);

    const data = _.at(response.data, [
      "reference",
      "amount",
      "customer.email",
      "metadata.fullName",
    ]);

    const [reference, amount, email, fullName] = data;

    const donor = new Donor({ reference, amount, email, fullName });

    donor.save().then((donor) => {
        if (!donor) {
          return res.redirect("/error");
        }
        res.redirect("/receipt/" + donor._id);
      }).catch((e) => {
        res.redirect("/error");
      });
  });
});

app.get("/receipt/:id", async (req, res) => {
  const id = req.params.id;

  Donor.findById(id).then((donor) => {
      if (!donor) {
        res.redirect("/error");
      }
      res.render("success.pug", { donor });
    })
    .catch((e) => {
      res.redirect("/error");
    });
});

app.get("/error", (req, res) => {
  res.render("error.pug");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});