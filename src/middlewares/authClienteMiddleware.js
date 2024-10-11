import jwt from "jsonwebtoken";

const authClienteMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Obtém o token do header de autorização

  if (!token) {
    return res.status(401).json({ message: "Token de autenticação não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.clienteId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token de autenticação inválido." });
  }
};

export default authClienteMiddleware;
