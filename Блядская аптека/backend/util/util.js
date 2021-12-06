import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const saltRounds = parseInt(process.env.SALT)

export async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds)
}

export function checkPassword(password, hash) {
    if (!hash) return false
    return bcrypt.compare(password, hash)
}

export async function generateAccessToken(id) {
    const payload = {id}
    return jwt.sign(payload, process.env.RANDOMSECRETKEY, {expiresIn: "24h"})
}
