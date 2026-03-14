import React, { createContext, useState, useContext, useEffect } from 'react'
import { authAPI } from '../utils/api'
import { toast } from 'react-toastify'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await authAPI.getCurrentUser()
        setUser(response.data.user)
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password })
      const { access_token, user } = response.data
      localStorage.setItem('token', access_token)
      setUser(user)
      toast.success('Login successful!')
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
      return false
    }
  }

  const register = async (name, email, password) => {
    try {
      await authAPI.register({ name, email, password })
      toast.success('Registration successful! Please login.')
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.info('Logged out successfully')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
