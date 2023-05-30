import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function jwtGenerator(user_id:any) {
  const payload = {
    user: user_id,
  };

  const secret = process.env.jwtSecret;

  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  const token = jwt.sign(payload, secret, { expiresIn: "1hr" });

  return token;
}

export default jwtGenerator;
