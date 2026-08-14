import * as invoiceRepository from "./invoices.repository.js"
import * as orderRepository from "../orders/order.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ConflictError } from "../../shared/errors/ConflictError.js"

export async function getMyInvoice(userId, invoiceId) {

  const invoice = await invoiceRepository.findById(invoiceId)

  if (!invoice) {
    throw new NotFoundError("La factura no existe")
  }

  if (invoice.order.userId !== userId) {
    throw new NotFoundError("La factura no existe")
  }

  return invoice
}

export async function getAllInvoices() {
  return await invoiceRepository.findAll()
}
