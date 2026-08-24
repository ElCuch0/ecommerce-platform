const API_URL = import.meta.env.VITE_API_URL

export async function apiRequest(
  endpoint,
  options = {}
) {

  const { requiresAuth = true, ...fetchOptions } = options
  const token = localStorage.getItem("accessToken")

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {

      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...(requiresAuth && token && {
          Authorization: `Bearer ${token}`
        }),
        ...fetchOptions.headers
      }
    }
  )

  console.log("STATUS: ", response.status)
  console.log("OK: ", response.ok)

  const data = await response.json()

  console.log("RESPONSE DATA: ", data)

  if (!response.ok) {
    throw {
      status: response.status,
      ...data
    }
  }

  console.log("REQUEST:", {
    url: `${API_URL}${endpoint}`,
    method: options.method || "GET",
});

  return data
}
