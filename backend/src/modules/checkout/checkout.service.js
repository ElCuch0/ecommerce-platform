import { createCheckout } from "./checkout.repository"

export async function createCheckout(data){

  try {

    data.product = data.product.trim()
    data.quantity = Number(data.quantity)
    data.price = Number(data.price)

    return await checkoutRepository.createCheckout(data)
  }catch (error) {
    throw new error
  }
}
