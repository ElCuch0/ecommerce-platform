

export async function createInvoice(data){

  try{

    data.invoiceId = Number(data.invoiceId)
    
    return await invoiceRepository.createInvoice(data)
  }catch (error) {
    throw new error
  }
}