// /src/app/profile/page.tsx

"use client";

import { useSession } from 'next-auth/react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


type UserProfile = {
  email: string;
  name: string | null;
  bio: string | null;
};

export default function Profile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");


  useEffect(() => {
    if (!session || !session.user) {
        router.push('/furniture');
        return;
      }
  
    async function fetchProfile() {
      const profile_id = userId || session.user?.id;

        try {
          const response = await fetch(`/api/user/profile?id=${profile_id}`);
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
          } else {
            console.error("Failed to fetch profile data");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    
    fetchProfile();
  }, [session]);

  if (!session || !session.user) {
    return <Typography variant="h6">You must be logged in to view your profile.</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Profile
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Email:</Typography>
        <Typography>{profile?.email || 'Not available'}</Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>Full Name:</Typography>
        <Typography>{profile?.name || 'Not provided'}</Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>Bio:</Typography>
        <Typography>{profile?.bio || 'Not provided'}</Typography>
      </Box>
    </Container>
  );
}
