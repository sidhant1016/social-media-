import bcrypt from "bcrypt"
import express, { Router,Request,Response } from "express"
import pool from "../database"
import jwtgenerator from "../util/jwtgenrator"
import autherization from "../middleware/autherization"
import validInfo from "../middleware/validInfo"


const router = express.Router();
router.use(express.json());

// register 
router.post("/register",validInfo, async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists (if so, throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // User does not exist, proceed with registration
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the user details in the database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    // Generate JWT 
    const token = jwtgenerator(newUser.rows[0].user_id);
    res.json({ name, token });

  } catch (error:any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// Login route
router.post("/login", validInfo,async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.rows[0].user_password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

     // provide token

     const token = jwtgenerator(user.rows[0].user_id);
     const name = user.rows[0].user_name;
     res.json({ name, token});
  } catch (err:any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verified", autherization, (req, res) => {
  try {
      res.json(true);

  } catch (err) {
      res.status(500).send('Server Error');     
  }
});

export default router;

