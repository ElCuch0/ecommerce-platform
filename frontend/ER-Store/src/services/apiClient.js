const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof data === "object" && data?.message
      ? data.message
      : "No fue posible completar la solicitud";
    throw new Error(message);
  }

  return data;
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, {
    method: "POST",
    body: JSON.stringify(body),
  }),
  put: (path, body) => request(path, {
    method: "PUT",
    body: JSON.stringify(body),
  }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export { API_URL };
