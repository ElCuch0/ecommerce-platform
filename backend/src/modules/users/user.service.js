import * as repository from "./user.repository.js"

export async function findAll() {
  return await repository.findAll()
}

export async function findById(id) {
  return await repository.findById(id)
}

export async function update(id, data) {
  
  const exists = await repository.findById(id)

  if (exists) {
    return await repository.update(id, data)
  }
}

export async function remove(id) {
  
  const exists = await repository.findById(id)

  if (exists) {
    return await repository.remove(id)
  }
  
}
