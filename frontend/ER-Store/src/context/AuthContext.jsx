import { createContext, useContext, useState } from "react"
import { login as loginRequest } from "../api/auth.api.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

	const [user, setUser] = useState(() => {
		const token = localStorage.getItem("accessToken")
		const storedUser = localStorage.getItem("user")

		if (!token) return null

		try {
			return storedUser ? JSON.parse(storedUser) : { authenticated: true }
		} catch {
			return { authenticated: true }
		}
	})
	const [loading, setLoading] = useState(false)

	//login
	const login = async (credentials) => {

		console.log("AUTH LOGIN: ", credentials)

		setLoading(true)

		try {

			const response = await loginRequest(credentials)

			console.log("AUTH RESPONSE: ", response)

			const token = response.data.accessToken
			const authenticatedUser = response.data.userWithoutPassword

			localStorage.setItem("accessToken", token)
			localStorage.setItem("user", JSON.stringify(authenticatedUser))

			setUser(authenticatedUser)

			return response
		} finally {
			setLoading(false)
		}
	}
	
	//logout
	const logout = () => {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("user")
		setUser(null)
	}

	//restaurar sesión

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error(
			"useAuth debe utilizarse dentro de AuthProvider"
		)
	}

	return context
}
