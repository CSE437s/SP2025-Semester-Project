"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Grid, Button } from '@mui/material';

interface ApartmentItem {
  id: number;
  userId: number; 
  price: number;
  location: string;
  amenities: string;
  description: string;
  availability: string;
  bedrooms: number;
  bathrooms: number;
  policies: string;
  pics: string[];
  rating: number;
}

const ApartmentDescriptionPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params['id'];

  const [apartmentItem, setApartmentItem] = useState<ApartmentItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchApartmentItem = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/apartment/${id}`);
          const data = await response.json();
          if (response.ok) {
            setApartmentItem(data);
          } else {
            setError(`Error: ${response.status} - ${data.message}`);
          }
        } catch (error) {
          setError('Error fetching apartment item: ' + error);
        } finally {
          setLoading(false);
        }
      };
      fetchApartmentItem();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!apartmentItem) return <div>No apartment item found.</div>;

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '20px auto' }}>
      <Card 
        sx={{ 
          boxShadow: 6, 
          borderRadius: 2, 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <CardMedia
          component="img"
          height="500"
          image={apartmentItem.pics[0] || "https://via.placeholder.com/400x300"}
          alt="Apartment Listing Image"
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {apartmentItem.description}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Price:
              </Typography>
              <Typography variant="body1">${apartmentItem.price}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Location:
              </Typography>
              <Typography variant="body1">{apartmentItem.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Bedrooms:
              </Typography>
              <Typography variant="body1">{apartmentItem.bedrooms}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Bathrooms:
              </Typography>
              <Typography variant="body1">{apartmentItem.bathrooms}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Amenities:
              </Typography>
              <Typography variant="body1">{apartmentItem.amenities}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Availability:
              </Typography>
              <Typography variant="body1">{apartmentItem.availability}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Policies:
              </Typography>
              <Typography variant="body1">{apartmentItem.policies}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary">
                Rating:
              </Typography>
              <Typography variant="body1">{apartmentItem.rating}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => router.back()}>
              Back to Listings
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ApartmentDescriptionPage;
