import React, { useEffect, useState } from 'react'
import { itemAPI } from '../utils/api'
import { buildImageUrl } from '../utils/api'
import { toast } from 'react-toastify'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Search } from '@mui/icons-material'

const FoundItems = () => {
  const [items, setItems] = useState([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [scanningItemId, setScanningItemId] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [matches, setMatches] = useState([])
  const [matchDialogOpen, setMatchDialogOpen] = useState(false)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    setLoadingItems(true)
    try {
      const response = await itemAPI.getMyFoundItems()
      setItems(response.data.items)
    } catch (error) {
      toast.error('Failed to load found items')
    } finally {
      setLoadingItems(false)
    }
  }

  const handleFindMatches = async (item) => {
    setScanningItemId(item.id)
    try {
      const response = await itemAPI.getFoundItemMatches(item.id)
      setMatches(response.data.matches)
      setSelectedItem(item)
      setMatchDialogOpen(true)
    } catch (error) {
      toast.error('Failed to find matches')
    } finally {
      setScanningItemId(null)
    }
  }

  return (
    <Container maxWidth="lg" className="animate-fade-in">
      <Typography variant="h4" gutterBottom sx={{ mt: 4, fontWeight: 700 }}>
        My Found Items
      </Typography>

      <Alert severity="info" sx={{ mt: 2 }}>
        AI scanning happens when you click <strong>Find Matches</strong>. This shows lost-item reports likely to match what you found.
      </Alert>

      {loadingItems ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No found items reported yet
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
                    color={item.status === 'available' ? 'success' : 'default'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
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
            <Typography>No matching lost-item reports found</Typography>
          ) : (
            <List>
              {matches.map((match, index) => (
                <React.Fragment key={match.lost_item.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="h6">{match.lost_item.name}</Typography>
                          <Chip
                            label={`${(match.similarity_score * 100).toFixed(0)}% Match`}
                            color="success"
                            size="small"
                          />
                          <Chip label={match.match_confidence} size="small" variant="outlined" />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="div">
                            <strong>Description:</strong> {match.lost_item.description}
                          </Typography>
                          <Typography variant="body2" component="div">
                            <strong>Location:</strong> {match.lost_item.location}
                          </Typography>
                        </>
                      }
                    />
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

export default FoundItems
