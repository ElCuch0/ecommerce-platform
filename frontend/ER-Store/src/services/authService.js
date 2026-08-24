import { apiClient } from "./apiClient";

export function registerUser(userData) {
	return apiClient.post("/auth/register", userData);
}

export function getCurrentUser() {
	return apiClient.get("/auth/me");
}

export async function loginUser(credentials) {
	const response = await apiClient.post("/auth/login", credentials);
	const authData = response.data;

	if (authData?.accessToken) {
		localStorage.setItem("token", authData.accessToken);
		localStorage.setItem("user", JSON.stringify(authData.userWithoutPassword));
	}

	return response;
}

export function logoutUser() {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
}
