"use client";

import { useSession } from 'next-auth/react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


type UserProfile = {
  email: string;
  name: string | null;
  bio: string | null;
};

const ProfileContent = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");


  useEffect(() => {
    if (!session || !session.user) {
      router.push('/furniture');
      return;
    }

    async function fetchProfile() {
      let profile_id;
      if (session) {
        profile_id = session.user.id;
      } else {
        profile_id = userId;
      }

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
};

const Profile = () => (
  <Suspense fallback={<CircularProgress />}>
    <ProfileContent />
  </Suspense>
);

export default Profile;
