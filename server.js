import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3e3;
app.use(helmet());
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 5,
  // Limit each IP to 5 requests per windowMs
  message: { error: "Too many login attempts from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(express.json());
app.post("/api/login", loginLimiter, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const validEmail = process.env.ADMIN_EMAIL || "admin@espafoundation.org";
  const validPassword = process.env.ADMIN_PASSWORD || "securepassword123";
  if (email === validEmail && password === validPassword) {
    return res.json({
      success: true,
      user: {
        email: validEmail,
        name: "Admin User",
        role: "admin"
      },
      token: "mock-jwt-token"
    });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
} else {
  app.get("/api/*", (req, res) => {
    res.status(404).json({ error: "API route not found" });
  });
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
