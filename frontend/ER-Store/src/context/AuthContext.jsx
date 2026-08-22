const AuthContext = createContext()

export function AuthProvider({ children }) {

	const [user, setUser] = useState(null)

	//login
	//logout
	//restaurar sesión
	//etc.

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
