import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import UsuarioSessaoRepository from "../repositories/UsuarioSessaoRepository.js";

class AuthService {
  async login({ email, senha }) {
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);
    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    const { senha_hash, ...usuarioSemSenha } = usuario.toJSON();

    const token = jwt.sign(usuarioSemSenha, process.env.JWT_SECRET, { expiresIn: "12h" });

    await UsuarioSessaoRepository.create({
      usuario_id: usuario.id,
      token_sessao: token,
      expiracao: new Date(Date.now() + 3600 * 1000), // 1 hora de validade
    });

    return { token, user: usuarioSemSenha };
  }

  async loginCliente({ email, senha }) {
    const cliente = await ClienteRepository.findByEmail(email);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(senha, cliente.senha_hash);
    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    const { senha_hash, ...clienteSemSenha } = cliente.toJSON();

    const token = jwt.sign(clienteSemSenha, process.env.JWT_SECRET, { expiresIn: "12h" });

    return { token, cliente: clienteSemSenha };
  }
}

export default new AuthService();
