"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface apartmentItem {
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
  console.log("iam here")
  const params = useParams<{ tag: string; item: string }>()
  const id  = params['id']; 


  const [apartmentItem, setApartmentItem] = useState<apartmentItem | null>(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      console.log("Fetching apartment item with ID:", id);
      const fetchApartmentItem = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/apartment/${id}`);
          console.log("Response status:", response.status); 
          const data = await response.json();
          console.log("Fetched data:", data); 
          if (response.ok) {
            setApartmentItem(data);
          } else {
            console.log(`Error: ${response.status} - ${data.message}`);
          }
        } catch (error) {
          console.log('Error fetching aparment item:', error);
        }
      };
      fetchApartmentItem();
    }
  }, [id]);
  

  if (!apartmentItem) return <div>Loading...</div>;

  return (
    <div>
      <h1>{apartmentItem.description}</h1>
      <p>Price: ${apartmentItem.price}</p>
      <p>description: {apartmentItem.description}</p>
      <p>amenities: {apartmentItem.amenities}</p>
      <p># of bedrooms: ${apartmentItem.bedrooms}</p>
      <p># of bathrooms: {apartmentItem.bathrooms}</p>
      <p>policies: {apartmentItem.policies}</p>
      <p>rating: {apartmentItem.rating}</p>
    </div>
  );
};

export default ApartmentDescriptionPage;
