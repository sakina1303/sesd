import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { itemAPI } from '../utils/api'
import { toast } from 'react-toastify'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material'

const ReportLostItem = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
  })
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('name', formData.name)
    data.append('description', formData.description)
    data.append('location', formData.location)
    if (image) {
      data.append('image', image)
    }

    try {
      await itemAPI.createLostItem(data)
      toast.success('Lost item reported successfully!')
      navigate('/lost-items')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to report lost item')
    }
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Report Lost Item
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Provide details about your lost item. AI will automatically search for matches.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            placeholder="e.g., iPhone 13 Pro"
          />

          <TextField
            required
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            placeholder="Provide detailed description: color, brand, unique features..."
          />

          <TextField
            required
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            placeholder="Where did you lose it? e.g., Library 3rd Floor"
          />

          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" component="label">
              Upload Image (Optional)
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {image.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Report Lost Item
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default ReportLostItem
