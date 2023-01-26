import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (!existUser)
      return res.status(400).json({ message: "User dosen't exist!" });

    const isPasswordCurrect = await bcrypt.compare(
      password,
      existUser.password
    );

    if (!isPasswordCurrect)
      return res.status(400).json({ message: "Wrong Password!" });

    const token = jwt.sign(
      { email: existUser.email, id: existUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.starus(200).json({ result: existUser, token });
  } catch (error) {
    res.status(500).json({ message: "server error! please try again" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser)
      return res.status(400).json({ message: "User already exsists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "password did not match" });

    const hashingPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashingPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "server error, plase try again!" });
  }
};
