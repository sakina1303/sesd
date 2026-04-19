import React, { useEffect, useState } from 'react'
import { adminAPI } from '../utils/api'
import { toast } from 'react-toastify'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Box,
  Tabs,
  Tab,
  Divider,
} from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [claims, setClaims] = useState([])
  const [users, setUsers] = useState([])
  const [lostItems, setLostItems] = useState([])
  const [foundItems, setFoundItems] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [claimsRes, usersRes, lostRes, foundRes] = await Promise.all([
        adminAPI.getPendingClaims(),
        adminAPI.getAllUsers(),
        adminAPI.getAllLostItems(),
        adminAPI.getAllFoundItems(),
      ])

      setClaims(claimsRes.data.claims)
      setUsers(usersRes.data.users)
      setLostItems(lostRes.data.items)
      setFoundItems(foundRes.data.items)
    } catch (error) {
      toast.error('Failed to load admin data')
    }
  }

  const handleApproveClaim = async (claimId) => {
    try {
      await adminAPI.approveClaim(claimId)
      toast.success('Claim approved successfully')
      loadData()
    } catch (error) {
      toast.error('Failed to approve claim')
    }
  }

  const handleRejectClaim = async (claimId) => {
    try {
      await adminAPI.rejectClaim(claimId)
      toast.success('Claim rejected')
      loadData()
    } catch (error) {
      toast.error('Failed to reject claim')
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total Users</Typography>
              <Typography variant="h4">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Pending Claims</Typography>
              <Typography variant="h4">{claims.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Lost Items</Typography>
              <Typography variant="h4">{lostItems.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Found Items</Typography>
              <Typography variant="h4">{foundItems.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab label="Pending Claims" />
        <Tab label="Users" />
        <Tab label="All Items" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Pending Claims
          </Typography>
          {claims.length === 0 ? (
            <Typography color="text.secondary">No pending claims</Typography>
          ) : (
            <Grid container spacing={2}>
              {claims.map((claim) => (
                <Grid item xs={12} key={claim.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Claim #{claim.id} - {claim.claimant_name}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="primary">
                            Lost Item
                          </Typography>
                          <Typography>{claim.lost_item?.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {claim.lost_item?.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="success.main">
                            Found Item
                          </Typography>
                          <Typography>{claim.found_item?.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {claim.found_item?.description}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" gap={2}>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => handleApproveClaim(claim.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => handleRejectClaim(claim.id)}
                        >
                          Reject
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            All Users
          </Typography>
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            All Lost Items: {lostItems.length}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            All Found Items: {foundItems.length}
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default AdminDashboard
