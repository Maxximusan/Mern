const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const config = require("config");

const router = Router();

const validation = [
  check("email", "Некоректный email").isEmail(),
  check("password", "минимальныя длинна пароля 6 символов").isLength({
    min: 6,
  }),
];

const validationForLogin = [
  check("email", "Введите коректный email").normalizeEmail().isEmail(),
  check("password", "минимальныя длинна пароля 6 символов").exists(),
];
//РЕГИСТРАЦИЯ - /api/auth/register
router.post("/register", validation, async (request, responce) => {
  try {
    console.log("ЧТО ТУТ НАХУЙ ПРОИСХОДИТ В BODY?", request.body);

    //обработка Валидации
    const errors = validationResult(request);

    //если есть ошибки - возвращаем на фронтенд
    if (!errors.isEmpty()) {
      return responce.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации",
      });
    }

    //   то что будем отправлять с фронтенда
    const { email, password } = request.body;

    //проверяем есть ли такой пользователь в базе (по схеме User)
    const candidate = await User.findOne({ email: email });

    //если база данных нашла пользователя
    if (candidate) {
      return responce
        .status(400)
        .json({ message: "такой пользователь уже существует" });
    }

    //шифруем пароль нового пользователя
    const hashedPassword = await bcrypt.hash(password, 12);

    //создаем нового пользователя
    const userr = new User({ email, password: hashedPassword });

    //сохраняем
    await userr.save();

    //отвечаем фронтенду
    responce.status(201).json({ message: "Пользователь создан" });
  } catch (error) {
    responce.status(500).json({ message: "Что-то пошло не так" });
  }
});

// ЛОГИН - /api/auth/login
router.post("/login", validationForLogin, async (req, res) => {
  try {
    //обработка Валидации
    const errors = validationResult(req);

    //если есть ошибки - возвращаем на фронтенд
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при логине",
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    //проверяем совпадают ли пароли
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте еще раз" });
    }

    // шифруем данные
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecretKey"), {
      expiresIn: "1h",
    });

    // отвечаем человеку (на фронт)
    res.json({ token, userId: user.id });
  } catch (error) {
    responce.status(500).json({ message: "Что-то пошло не так (auth routes)" });
  }
});

module.exports = router;
