// pages/api/user/auth.js
import { SHA256 as sha256 } from "crypto-js";
import prisma from "../../lib/prisma";
import hashPassword from "./create";

export default async function handle(req, res) {
  
  if (req.method === "POST") {
    
    await loginUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function loginUserHandler(req, res) {
  
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid inputs" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        image: true,
      },
    });

    if (user && user.password === hashPassword(password)) {
      return res.status(200).json(exclude(user, ["password"]));
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
