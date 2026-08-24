import { ConflictError } from "../../shared/errors/ConflictError.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import * as repository from "./user.repository.js"

export async function findAll() {
  return await repository.findAll()
}

export async function findById(id) {

  const user = await repository.findById(id)

  if (!user) {
    throw new NotFoundError("El usuario no existe")
  }

  return user
}

export async function activate(id) {
  
  const user = await repository.findById(id)

  if (!user) {
    throw new NotFoundError("El usuario no existe")
  }

  if (user.isActive) {
    throw new ConflictError("El usuario ya está activo")
  }

  return repository.activate(id)
}

export async function deactivate(id) {
  
  const user = await repository.findById(id)

  if (!user) {
    throw new NotFoundError("El usuario no existe")
  }

  if (!user.isActive) {
    throw new ConflictError("El usuario ya esta desactivado")
  }

  return repository.deactivate(id)
}
