import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const saltRounds = parseInt(process.env.SALT);

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

export function generateRandomNumb(length) {
  let numb = ''
  for (let pos = 0; pos < length; pos++) {
    numb += Math.trunc(Math.random() * 10)
  }
  return +numb
}

export function generateConfirmationCode() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
  }
  return token
}