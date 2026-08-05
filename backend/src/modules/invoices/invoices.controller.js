

export async function create(req, res, next){

  try{
    const {} = req.body

    return res.status(201).json({
      message: "La factura se ha generado con éxito",
      data: await invoicesService.createInvoice(data)
    })
  }catch (error) {
    next(error)
  }
}
