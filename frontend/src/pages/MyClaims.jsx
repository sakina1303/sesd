import React, { useEffect, useState } from 'react'
import { claimAPI } from '../utils/api'
import { toast } from 'react-toastify'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Divider,
} from '@mui/material'

const MyClaims = () => {
  const [claims, setClaims] = useState([])

  useEffect(() => {
    loadClaims()
  }, [])

  const loadClaims = async () => {
    try {
      const response = await claimAPI.getMyClaims()
      setClaims(response.data.claims)
    } catch (error) {
      toast.error('Failed to load claims')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success'
      case 'rejected':
        return 'error'
      default:
        return 'warning'
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        My Claims
      </Typography>

      {claims.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No claims submitted yet
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {claims.map((claim) => (
            <Grid item xs={12} key={claim.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                      Claim #{claim.id}
                    </Typography>
                    <Chip
                      label={claim.status.toUpperCase()}
                      color={getStatusColor(claim.status)}
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Lost Item
                      </Typography>
                      <Typography variant="h6">
                        {claim.lost_item?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {claim.lost_item?.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <strong>Location:</strong> {claim.lost_item?.location}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Found Item (Claimed)
                      </Typography>
                      <Typography variant="h6">
                        {claim.found_item?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {claim.found_item?.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <strong>Location:</strong> {claim.found_item?.location}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" color="text.secondary">
                    <strong>Submitted:</strong>{' '}
                    {new Date(claim.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default MyClaims
