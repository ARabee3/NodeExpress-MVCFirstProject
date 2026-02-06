import jwt from "jsonwebtoken";
import "dotenv/config";
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized or Token invalid, Please sign in." });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;
