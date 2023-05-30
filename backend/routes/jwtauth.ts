import bcrypt from "bcrypt"
import express, { Router } from "express"
import pool from "../database"
import jwtGenerator from "../util/jwtGenerator";
import validInfo from "../middleware/validInfo"
import authorize from "../middleware/authorization"
const router = express.Router();
router.use(express.json());

router.post("/register", validInfo, async (req, res) => {
    const { email, name, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);
  
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      let newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );
  
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);
  
      return res.json({ jwtToken });
    } catch (err:any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  router.post("/login", validInfo, async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } catch (err:any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err:any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  export default router
  