"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Box } from '@mui/material';
import { useSession } from 'next-auth/react';

const SetupProfile = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get session data
  const email = session?.user?.email || '';
  

  const formik = useFormik({
    initialValues: {
      fullName: '',
      bio: '',
      email: email, // Prepopulate email if available
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      bio: Yup.string().required('Bio is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch('/api/user/update-profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        
        if (res.ok) {
          router.push('/furniture'); // Redirect after successful profile update
        } else {
          console.error('Error updating profile');
        }
      } catch (error) {
        console.error('Failed to submit form', error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            value={formik.values.email}
            disabled
            margin="normal"
          />
          <TextField
            label="Full Name"
            fullWidth
            {...formik.getFieldProps('fullName')}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            margin="normal"
          />
          <TextField
            label="Bio"
            fullWidth
            {...formik.getFieldProps('bio')}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
            margin="normal"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Save Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SetupProfile;
