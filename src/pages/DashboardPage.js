import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Snackbar, Alert, TextField, FormControl, FormControlLabel, Checkbox, Button, Box, Grid } from '@mui/material';

function DashboardPage() {
  const [bannerData, setBannerData] = useState({
    visibility: false,
    description: '',
    timer: 60,
    link: '',
    backgroundImage: '' // New field
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch banner data on component mount
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/banner')
      .then(response => {
        setBannerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching banner data:', error.response ? error.response.data : error.message);
        setSnackbar({
          open: true,
          message: 'Failed to fetch banner data. Check console for details.',
          severity: 'error'
        });
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData({
      ...bannerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Submit form data to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('https://d1dflmwcyl.execute-api.us-east-1.amazonaws.com/dev/banner', bannerData)
      .then(() => {
        setSnackbar({
          open: true,
          message: 'Banner settings updated successfully!',
          severity: 'success'
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error updating banner settings:', error.response ? error.response.data : error.message);
        setSnackbar({
          open: true,
          message: 'Failed to update banner settings. Check console for details.',
          severity: 'error'
        });
        setLoading(false);
      });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Dashboard</h2>
      {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={<Checkbox checked={bannerData.visibility} onChange={handleChange} name="visibility" />}
                label="Show Banner"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={bannerData.description}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Timer (seconds)"
              name="timer"
              value={bannerData.timer}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Link"
              name="link"
              value={bannerData.link}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Background Image Link (optional)"
              name="backgroundImage"
              value={bannerData.backgroundImage}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              endIcon={loading ? <CircularProgress size={24} /> : null}
            >
              {loading ? 'Updating...' : 'Update Banner'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DashboardPage;
