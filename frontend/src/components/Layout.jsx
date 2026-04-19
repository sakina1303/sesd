import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material'

const Layout = ({ children }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
    navigate('/login')
  }

  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuthPage && (
        <AppBar position="sticky" elevation={0} sx={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          color: 'text.primary',
          pt: 1,
          pb: 1
        }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                flexGrow: 1, 
                cursor: 'pointer',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4f46e5, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              onClick={() => navigate('/dashboard')}
            >
              RetrievAI
            </Typography>

            {isAuthenticated && (
              <>
                <Button sx={{ mx: 0.5, fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main', background: 'rgba(79, 70, 229, 0.08)' } }} onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
                <Button sx={{ mx: 0.5, fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main', background: 'rgba(79, 70, 229, 0.08)' } }} onClick={() => navigate('/lost-items')}>
                  Lost Items
                </Button>
                <Button sx={{ mx: 0.5, fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main', background: 'rgba(79, 70, 229, 0.08)' } }} onClick={() => navigate('/found-items')}>
                  Found Items
                </Button>
                <Button sx={{ mx: 0.5, fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main', background: 'rgba(79, 70, 229, 0.08)' } }} onClick={() => navigate('/my-claims')}>
                  My Claims
                </Button>
                {isAdmin && (
                  <Button sx={{ mx: 0.5, fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main', background: 'rgba(79, 70, 229, 0.08)' } }} onClick={() => navigate('/admin')}>
                    Admin
                  </Button>
                )}
                <IconButton
                  size="large"
                  aria-label="account"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  sx={{ color: 'primary.main' }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>
                    {user?.name} ({user?.role})
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}

      <Container
        component="main"
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, flexGrow: 1 }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center" sx={{ fontWeight: 500 }}>
            © {new Date().getFullYear()} RetrievAI - AI-Powered Lost & Found System
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
