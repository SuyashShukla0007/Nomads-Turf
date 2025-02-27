import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Please provide email and password" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" })
    }
    const token = jwt.sign({ id: user._id, email }, "shubham")
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 30, // 1 day in milliseconds (optional if expiresIn is set in JWT)
      path: "/", // Cookie is accessible on the whole site
    })
    res
      .status(200)
      .json({ error: false, data: user, message: "Login successful", token })
  } catch (error) {
    console.log(error)
  }
}
export const authStatus = async (req, res) => {
  console.log(req.cookies.token)
  const token = req.cookies.token
  if (!token) {
    return res.status(200).json({
      error: true,
      message: "missing token",
      data: {
        authenticated: false,
        user: {},
      },
    })
  }
  try {
    const decoded = jwt.verify(token, "shubham")
    console.log(decoded)
    res.status(200).json({
      error: false,
      message: "Token is valid",
      data: {
        authenticated: true,
        user: decoded,
      },
    })
  } catch (error) {
    res.status(200).json({
      error: true,
      message: "Invalid token",
      data: {
        authenticated: false,
        user: {},
      },
    })
    console.log(error)
  }
}
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  })
  res.send("Token deleted")
}
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Please provide email and password" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const existedAdmin = await User.findOne({ email })
    if (existedAdmin) {
      return res
        .status(400)
        .json({ error: true, message: "Admin already exists", data: null })
    }
    const newUser = new User({
      email,
      password: hashedPassword,
    })
    await newUser.save()
    res.status(201).json({
      error: false,
      message: "User Created successfully",
      data: newUser,
    })
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, data: null })
  }
}
