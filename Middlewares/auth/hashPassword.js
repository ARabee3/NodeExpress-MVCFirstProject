import bcrypt from "bcrypt";
import "dotenv/config";
const hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default hashPassword;
