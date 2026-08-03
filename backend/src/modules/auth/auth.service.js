import { UnathorizedError } from "../../utils/errors.js";
import { generateToken } from "../../shared/utils/jwt.js";
import { createUser, findUserByEmail } from "./auth.repository.js";

import bcrypt from "bcrypt";
import { process } from "node:process";

export async function registerUser(data){

  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new ConflictError("Este correo ya esta asociado a una cuenta");
  }


  data.name = data.name.trim();
  data.lastname = data.lastname.trim();
  data.email = data.email.toLowerCase();
  data.password = await bcrypt.hash(data.password, 10);
  data.telephone = data.telephone.trim();

  return createUser(data);

}

export async function loginUser(data){

  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new UnauthorizedError("Usuario o contraseña incorrectos");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new UnauthorizedError("Usuario o contraseña incorrectos");
  }

  const accessToken = generateToken({ id: user.id, role: user.role }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

  return { ...user, accessToken };
}
