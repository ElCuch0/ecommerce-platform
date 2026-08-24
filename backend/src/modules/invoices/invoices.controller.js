import * as service from "./invoices.service.js"

export async function getMyInvoice(req, res, next) {

  try {

    const userId = req.user.id
    const invoiceId = req.params.id

    return res.status(200).json({
      success: true,
      data: await service.getMyInvoice(Number(userId), Number(invoiceId))
    })
  }catch (error) {
    next(error)
  }
}

export async function getMyInvoices(req, res, next) {

  try {

    const userId = req.user.id

    return res.status(200).json({
      success: true,
      data: await service.getMyInvoices(Number(userId))
    })
  }catch (error) {
    next(error)
  }
}

export async function getAll(req, res, next) {

  try {

    return res.status(200).json({
      success: true,
      data: await service.getAllInvoices()
    })
  }catch (error) {
    next(error)
  }
}
