import * as invoiceRepository from "./invoices.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"

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

export async function getMyInvoices(userId) {
  
  return invoiceRepository.findByUserId(userId)
}

export async function getAllInvoices() {
  return await invoiceRepository.findAll()
}
