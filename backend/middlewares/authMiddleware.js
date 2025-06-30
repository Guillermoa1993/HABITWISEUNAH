// middlewares/authMiddleware.js
import admin from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const idToken = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // aquí tendrás { uid, email, ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido", error: error.message });
  }
};
