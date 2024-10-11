import AuthService from "../services/AuthService.js";

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const { token, user } = await AuthService.login({ email, senha });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export async function loginCliente(req, res) {
  const { email, senha } = req.body;

  try {
    const { token, cliente } = await AuthService.loginCliente({ email, senha });
    res.status(200).json({ token, cliente });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
