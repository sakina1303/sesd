import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { itemAPI, claimAPI } from '../utils/api'
import { buildImageUrl } from '../utils/api'
import { toast } from 'react-toastify'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Search, CheckCircle } from '@mui/icons-material'

const LostItems = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [matches, setMatches] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [matchDialogOpen, setMatchDialogOpen] = useState(false)
  const [loadingItems, setLoadingItems] = useState(true)
  const [scanningItemId, setScanningItemId] = useState(null)
  const [claimingFoundItemId, setClaimingFoundItemId] = useState(null)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    setLoadingItems(true)
    try {
      const response = await itemAPI.getMyLostItems()
      setItems(response.data.items)
    } catch (error) {
      toast.error('Failed to load lost items')
    } finally {
      setLoadingItems(false)
    }
  }

  const handleFindMatches = async (item) => {
    setScanningItemId(item.id)
    try {
      const response = await itemAPI.getLostItemMatches(item.id)
      setMatches(response.data.matches)
      setSelectedItem(item)
      setMatchDialogOpen(true)
    } catch (error) {
      toast.error('Failed to find matches')
    } finally {
      setScanningItemId(null)
    }
  }

  const handleClaimItem = async (foundItem) => {
    setClaimingFoundItemId(foundItem.id)
    try {
      await claimAPI.createClaim({
        lost_item_id: selectedItem.id,
        found_item_id: foundItem.id,
      })
      toast.success('Claim submitted successfully!')
      setMatchDialogOpen(false)
      navigate('/my-claims')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit claim')
    } finally {
      setClaimingFoundItemId(null)
    }
  }

  return (
    <Container maxWidth="lg" className="animate-fade-in">
      <Typography variant="h4" gutterBottom sx={{ mt: 4, fontWeight: 700 }}>
        My Lost Items
      </Typography>

      <Alert severity="info" sx={{ mt: 2 }}>
        AI scanning happens when you click <strong>Find Matches</strong> on a lost item.
        If a strong match appears, submit a claim and track approval in <strong>My Claims</strong>.
      </Alert>

      {loadingItems ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No lost items reported yet
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }} className="animate-slide-up">
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                {item.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={buildImageUrl(item.image)}
                    alt={item.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Location:</strong> {item.location}
                  </Typography>
                  <Chip
                    label={item.status}
                    color={item.status === 'active' ? 'primary' : 'default'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Search />}
                      fullWidth
                      disabled={scanningItemId === item.id}
                      onClick={() => handleFindMatches(item)}
                    >
                      {scanningItemId === item.id ? 'Scanning...' : 'Find Matches'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={matchDialogOpen}
        onClose={() => setMatchDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          AI Matches for: {selectedItem?.name}
        </DialogTitle>
        <DialogContent>
          {matches.length === 0 ? (
            <Typography>No matches found</Typography>
          ) : (
            <List>
              {matches.map((match, index) => (
                <React.Fragment key={match.found_item.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="h6">
                            {match.found_item.name}
                          </Typography>
                          <Chip
                            label={`${(match.similarity_score * 100).toFixed(0)}% Match`}
                            color="success"
                            size="small"
                          />
                          <Chip
                            label={match.match_confidence}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="div">
                            <strong>Description:</strong> {match.found_item.description}
                          </Typography>
                          <Typography variant="body2" component="div">
                            <strong>Location:</strong> {match.found_item.location}
                          </Typography>
                        </>
                      }
                    />
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      disabled={claimingFoundItemId === match.found_item.id}
                      onClick={() => handleClaimItem(match.found_item)}
                    >
                      {claimingFoundItemId === match.found_item.id ? 'Submitting...' : 'Claim'}
                    </Button>
                  </ListItem>
                  {index < matches.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMatchDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default LostItems
