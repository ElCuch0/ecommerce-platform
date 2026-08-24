import { createContext, useContext, useState } from "react"
import { login as loginRequest } from "../api/auth.api.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)

	//login
	const login = async (credentials) => {

		console.log("AUTH LOGIN: ", credentials)

		setLoading(true)

		try {

			const response = await loginRequest(credentials)

			console.log("AUTH RESPONSE: ", response)

			const token = response.data.accessToken

			console.log("TOKEN: ", token)

			localStorage.setItem("accessToken", token)

			setUser({
				autheticated: true
			})

			return response
		} finally {
			setLoading(false)
		}
	}
	
	//logout
	const logout = () => {
		localStorage.removeItem("token")
		setUser(null)
	}

	//restaurar sesión

	return (
		<AuthContext.Provider
			value={{
				user,
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
