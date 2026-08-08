import bcrypt from "bcrypt";
import { generateToken } from "../../shared/utils/jwt.js"
import * as userRepository from "../users/user.repository.js"
import * as roleRepository from "../roles/role.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ConflictError } from "../../shared/errors/ConflictError.js";
import { UnauthorizedError } from "../../shared/errors/UnauthorizedError.js"

export async function register(data){

  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new ConflictError("Este correo ya esta asociado a una cuenta", 409)
  }

  const role = await roleRepository.findByName("CUSTOMER")

  if (!role) {
    throw new NotFoundError("El rol CUSTOMER no está configurado.")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await userRepository.create({
    name: data.name,
    lastname: data.lastname,
    email: data.email,
    password: hashedPassword,
    roleId: role.id
  })

  const { password, ...userWithoutPassword } = user

  return userWithoutPassword

}

export async function login(data){

  const user = await userRepository.findByEmail(data.email)

  if (!user) {
    throw new UnauthorizedError("Usuario o contraseña incorrectos")
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new UnauthorizedError("Usuario o contraseña incorrectos");
  }

  const accessToken = generateToken({
    id: user.id,
    role: user.role.name
  })

  const { password, ...userWithoutPassword } = user

  return {
    userWithoutPassword,
    accessToken
  };
}
