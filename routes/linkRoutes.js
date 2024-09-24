const { Router } = require("express");
const uid = require("uid");
const config = require("config");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/generate", auth, async (request, responce) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = request.body;

    const code = uid.generate(); // возможно без generte

    const existing = await Link.findOne({ from });

    if (existing) {
      return responce.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: request.user.userId,
    });

    await link.save();
    responce.status(201).json({ link });
  } catch (error) {
    responce
      .status(500)
      .json({ message: "Что-то пошло не так - (link routes)" });
  }
});

router.get("/", auth, async (request, responce) => {
  try {
    const links = await Link.find({ owner: request.user.userId });
    responce.json(links);
  } catch (error) {
    responce
      .status(500)
      .json({ message: "Что-то пошло не так - (link routes)" });
  }
});

router.get("/:id", auth, async (request, responce) => {
  try {
    const link = await Link.findById(request.params.id);
    responce.json(link);
  } catch (error) {
    responce
      .status(500)
      .json({ message: "Что-то пошло не так - (link routes)" });
  }
});

module.exports = router;
