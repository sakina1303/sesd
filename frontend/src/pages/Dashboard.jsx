import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { itemAPI } from '../utils/api'
import { toast } from 'react-toastify'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Add, Search } from '@mui/icons-material'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    myLostItems: 0,
    myFoundItems: 0,
    totalLost: 0,
    totalFound: 0,
  })
  const [loadingStats, setLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState('')

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoadingStats(true)
    setStatsError('')
    try {
      const [myLost, myFound, allLost, allFound] = await Promise.all([
        itemAPI.getMyLostItems(),
        itemAPI.getMyFoundItems(),
        itemAPI.getAllLostItems(),
        itemAPI.getAllFoundItems(),
      ])

      setStats({
        myLostItems: myLost.data.items.length,
        myFoundItems: myFound.data.items.length,
        totalLost: allLost.data.items.length,
        totalFound: allFound.data.items.length,
      })
    } catch (error) {
      setStatsError('Failed to load dashboard stats. Try refreshing.')
      toast.error('Failed to load dashboard stats')
    } finally {
      setLoadingStats(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="animate-fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
        Welcome, {user?.name}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
        AI-Powered Lost & Found Management System
      </Typography>

      {statsError && (
        <Alert
          severity="warning"
          action={<Button color="inherit" size="small" onClick={loadStats}>Retry</Button>}
          sx={{ mt: 2 }}
        >
          {statsError}
        </Alert>
      )}

      {loadingStats ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
      <Grid container spacing={3} sx={{ mt: 2 }} className="animate-slide-up">
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                My Lost Items
              </Typography>
              <Typography variant="h3">{stats.myLostItems}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                My Found Items
              </Typography>
              <Typography variant="h3">{stats.myFoundItems}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Lost Items
              </Typography>
              <Typography variant="h3">{stats.totalLost}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Found Items
              </Typography>
              <Typography variant="h3">{stats.totalFound}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      )}

      <Box sx={{ mt: 6 }} className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Add color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Report Lost Item</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Lost something? Report it and let AI find matches.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate('/report-lost')}
                >
                  Report Lost
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Add color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6">Report Found Item</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Found something? Help someone recover their item.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => navigate('/report-found')}
                >
                  Report Found
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Search color="info" sx={{ mr: 1 }} />
                  <Typography variant="h6">Browse Items</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Search through lost and found items.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate('/lost-items')}
                >
                  Lost Items
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate('/found-items')}
                >
                  Found Items
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Dashboard
