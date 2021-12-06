import jwt from "jsonwebtoken"

const SECRET = process.env.RANDOMSECRETKEY

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(403).json({ message: "User is not logged" })
    }
    req.user = jwt.verify(token, SECRET)
    return next()
  } catch (e) {
    return res.status(403).json({ message: "User is not logged" })
  }
}