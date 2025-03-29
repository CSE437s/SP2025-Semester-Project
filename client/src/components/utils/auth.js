import axios from "axios"

// Helper functions for authentication

// Check if the token is valid (not expired)
export const isTokenValid = (token) => {
  if (!token) return false

  try {
    // JWT tokens are in format: header.payload.signature
    const payload = token.split(".")[1]
    if (!payload) return false

    // Decode the base64 payload
    const decodedPayload = JSON.parse(atob(payload))

    // Check if token has expiration
    if (!decodedPayload.exp) return true

    // Check if token is expired
    const expirationTime = decodedPayload.exp * 1000 // Convert to milliseconds
    return Date.now() < expirationTime
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}

// Set up axios with authentication headers
export const setupAxiosAuth = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return true
  }
  return false
}

// Clear authentication data
export const clearAuth = () => {
  localStorage.removeItem("token")
  delete axios.defaults.headers.common["Authorization"]
}

