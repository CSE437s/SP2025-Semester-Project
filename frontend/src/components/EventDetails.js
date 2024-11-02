import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText, Divider, CardMedia, IconButton, Snackbar
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../styles/EventDetails.css';
import washuLogo from '../assets/washuLogo.png';
import EditIcon from '@mui/icons-material/Edit';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const currUser = localStorage.getItem('username');
  const [author, setAuthor] = useState('');
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const [rsvps, setRsvps] = useState([]);  // Change here
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingRSVP, setLoadingRSVP] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events/${id}`);
        setEvent(response.data);
        setAuthor(response.data.username);
        setRsvps(response.data.rsvps || []); // Change here
        setComments(response.data.comments || []);
        setHasRSVPed(response.data.rsvps?.includes(currUser)); // Change here
      } catch (err) {
        setError('Failed to fetch event details.');
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, currUser]);

  const handleRSVP = async () => {
    setLoadingRSVP(true);
    try {
      const formData = new FormData();
      formData.append('username', currUser); // Append the username to form data
  
      if (hasRSVPed) {
        // User has already RSVPed, so we want to remove their RSVP
        const response = await axios.post(`http://localhost:8000/events/${id}/rsvp`, formData, {
          data: { username: currUser },
        });
        setSnackbarMessage(response.data.message || 'RSVP removed successfully!');
        setRsvps(prev => prev.filter(user => user !== currUser)); // Remove user from RSVP list
        setHasRSVPed(false); // Update state to reflect that the user has not RSVPed
      } else {
        // User has not RSVPed yet, so we want to add their RSVP
        const response = await axios.post(`http://localhost:8000/events/${id}/rsvp`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        });
        setSnackbarMessage(response.data.message || 'RSVP successful!');
        setRsvps(prev => [...prev, currUser]); // Add user to RSVP list
        setHasRSVPed(true); // Update state to reflect that the user has RSVPed
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error("RSVP Error:", error);
      setSnackbarMessage('An error occurred while updating your RSVP.');
      setSnackbarOpen(true);
    } finally {
      setLoadingRSVP(false);
    }
  };
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        await axios.post(`http://localhost:8000/events/${id}/comment`, {
          username: currUser,
          comment: newComment,
        });
        setComments(prev => [...prev, { username: currUser, comment: newComment }]);
        setNewComment('');
      } catch (error) {
        console.error("Comment Error:", error);
        setSnackbarMessage('Failed to add comment.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleEdit = () => navigate(`/edit-event/${id}`);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>No event found.</p>;

  const displayedImage = event.image_url || washuLogo;

  return (
    <Box sx={{ paddingX: 5, paddingY: 4, minHeight: '100vh', backgroundColor: '#f9f9f9 ', color: '#333' }}>
      <CardMedia
        component="img"
        sx={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
          borderRadius: 2,
          marginBottom: 3
        }}
        image={displayedImage}
        alt="Event Image"
      />
      <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: '#222', fontWeight: 'bold' }}>
        {event.name}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 2 }}>
          <Paper elevation={1} sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Event Details</Typography>
            <Typography variant="body1" sx={{ marginTop: 1, color: '#555', lineHeight: 1.6 }}>
              {event.details_of_event}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>
              <CalendarMonthIcon sx={{ marginRight: 1, color: '#555' }} />
              <Typography variant="body2">{event.date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <AccessTimeIcon sx={{ marginRight: 1, color: '#555' }} />
              <Typography variant="body2">{event.time}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <PlaceIcon sx={{ marginRight: 1, color: '#555' }} />
              <Typography variant="body2">{event.address}</Typography>
            </Box>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, marginY: 3 }}>
            <Button
              variant="outlined"
              onClick={handleRSVP}
              disabled={loadingRSVP}
              sx={{ width: '150px', color: '#BA0C2F', borderColor: '#BA0C2F' }}
            >
              {loadingRSVP ? "Processing..." : (hasRSVPed ? "Remove RSVP" : "RSVP")}
            </Button>
            {author === currUser && (
              <IconButton onClick={handleEdit} sx={{ color: '#BA0C2F' }}>
                <EditIcon />
              </IconButton>
            )}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#333' }}>Comments</Typography>
          <Paper elevation={1} sx={{ maxHeight: 200, overflow: 'auto', padding: 2, marginBottom: 2, backgroundColor: '#f9fafb' }}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Box key={index} sx={{ marginBottom: 1 }}>
                  <Typography variant="body2" sx={{ color: '#444' }}>
                    <strong>{comment.username}:</strong> {comment.comment}
                  </Typography>
                  <Divider sx={{ marginY: 1 }} />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments yet. Be the first to comment!
              </Typography>
            )}
          </Paper>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 1 }}>
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="contained" onClick={handleCommentSubmit}>Submit</Button>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper elevation={1} sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>RSVP'd Users</Typography>
            <List>
              {rsvps.length > 0 ? (
                rsvps.map((user, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={user} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No users have RSVP'd yet." />
                </ListItem>
              )}
            </List>
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default EventDetails;
