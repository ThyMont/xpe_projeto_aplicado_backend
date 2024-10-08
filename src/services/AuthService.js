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
}

export default new AuthService();
