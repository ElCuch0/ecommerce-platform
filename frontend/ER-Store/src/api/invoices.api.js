import { apiRequest } from "./client.js";

export async function getMyInvoices() {
  return await apiRequest("/invoices" ,{
    method: "GET",
    requiresAuth: true
  })
}
