import { apiClient } from "./apiClient";

export function registerUser(userData) {
	return apiClient.post("/auth/register", userData);
}

export async function loginUser(credentials) {
	const response = await apiClient.post("/auth/login", credentials);

	if (response.accessToken) {
		localStorage.setItem("token", response.accessToken);
	}

	return response;
}

export function logoutUser() {
	localStorage.removeItem("token");
}
