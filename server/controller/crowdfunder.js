import express from "express";
import {
  getAll,
  getById,
  insert,
  _delete,
  _update,
  exists,
  getByUserId,
} from "../service/crowdfunder.js";
import Joi from "joi";
import validator from "../middleware/validator.js";
import multer from "multer";
import { access, mkdir } from "fs/promises";
import { Op } from "sequelize";
import auth from "../middleware/authentication.js";
import { getAll as crowdfunderComments } from "../service/donations.js";

const Router = express.Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const path = "./uploads";
    try {
      await access(path);
    } catch {
      await mkdir(path);
    }
    cb(null, path);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".");
    callback(null, Date.now() + "." + ext[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    //Atliekamas failu formato tikrinimas
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

// Router.post('/upload_photo', upload.single('photo'), async(req, res) => {
//  console.log(req.file)
// })

Router.get("/comments/:id", async (req, res) => {
  const id = req.params.id;
  let entries = await getById(id);
  if (entries) {
    const comments = await crowdfunderComments(entries.id);
    res.json({ status: "success", message: comments });
  } else {
    res.json({ status: "danger", message: "Could not find profile" });
  }
});

Router.get("/", async (req, res) => {
  const crowdfunder = await getAll();

  if (crowdfunder) {
    for (let i = 0; i < crowdfunder.length; i++) {
      crowdfunder[i].donations = await crowdfunderComments(crowdfunder[i].id);
    }
    res.json({ message: crowdfunder, status: "success" });
  } else {
    res.json({ message: "an Error has occured", status: "danger" });
  }
});

Router.get("/user/:UserId", async (req, res) => {
  const UserId = req.params.UserId;
  let fundraiser = await getByUserId(UserId);

  if (fundraiser) {
    res.json({ message: fundraiser, status: "success" });
  } else {
    res.json({ message: "An error has occured", status: "danger" });
  }
});

Router.post("/create", auth, upload.single("cf_image"), async (req, res) => {
  console.log(req.file);
  req.body.cf_image = req.file.filename;
  if (await insert(req.body)) {
    res.json({ status: "success", message: "NFT successfully created" });
  } else {
    res.json({ status: "danger", message: "Error" });
  }
});

Router.get("/single/:id", async (req, res) => {
  const id = req.params.id;
  let entries = await getById(id);
  if (entries) {
    res.json({ status: "success", message: entries });
  } else {
    res.json({ status: "danger", message: "Could not find profile" });
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    await _delete(id);
    res.json({ status: "success", message: "NFT deleted" });
  } catch {
    res.json({ status: "danger", message: "NFT was not deleted" });
  }
});

Router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const crowdfunder = req.body;

  try {
    await _update(id, crowdfunder);
    res.json({ status: "success", message: "NFT information updated" });
  } catch {
    res.json({ status: "danger", message: "NFT information has not been updated" });
  }
});


export default Router;
