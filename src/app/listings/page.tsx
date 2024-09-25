'use client';

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { ApartmentCard } from '../components/apartment-card';
import ApartmentFilter from '../components/apartment-filter-card'; 
import Maps from '../components/map-card';
import { getCoordinatesOfAddress, haversineDistance } from './utils'; 

interface ApartmentItems {
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

interface Location {
  latitude: number;
  longitude: number;
  description: string;
}

const Listings = () => {
  const [apartmentItems, setApartmentItems] = useState<ApartmentItems[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [distRange, setDistRange] = useState<number[]>([0, 3]);
  const [filteredItems, setFilteredItems] = useState<ApartmentItems[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]); 
  const [bedNum, setBedNum] = useState<string>("Any");
  const [bathNum, setBathNum] = useState<string>("Any");

  useEffect(() => {
    const fetchApartmentItems = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/apartment');
        const text = await response.text();
        if (response.ok) {
          const data = JSON.parse(text);
          setApartmentItems(data);
          
        
          const locationsData = await Promise.all(data.map(async (item: ApartmentItems) => {
            const coords = await getCoordinatesOfAddress(item.location);
            if (coords) {
              return {
                latitude: coords.latitude,
                longitude: coords.longitude,
                description: item.description || "Apartment"
              };
            }
            return null;
          }));

          setLocations(locationsData.filter(loc => loc !== null));
        } else {
          console.error(`Error: ${response.status} - ${text}`);
        }
      } catch (error) {
        console.error('Error fetching apartment items:', error);
      }
    };

    fetchApartmentItems();
  }, []);

  useEffect(() => {
    //massive filter proccess
    const filterItems = async () => {
      const newFilteredItems = await Promise.all(apartmentItems.map(async (item, index) => {
        const isInRange = item.price >= priceRange[0] && item.price <= priceRange[1];
        const isNumBeds = bedNum === "Any" || (bedNum === "4+" && item.bedrooms >= 4) || 
        (bedNum !== "4+" && item.bedrooms === parseInt(bedNum || '0'));
        const isNumBaths = bathNum === "Any" || (bathNum === "4+" && item.bathrooms >= 4) || 
        (bathNum !== "4+" && item.bathrooms === parseInt(bathNum || '0'));
        console.log(item.bathrooms);
        const apartmentLocation = locations[index];
        if (apartmentLocation) {
          const distToUser = haversineDistance(apartmentLocation.latitude, apartmentLocation.longitude);
          const isWithinDistance = await distToUser <= distRange[1] && await distToUser >= distRange[0];
          return isInRange && isNumBeds && isNumBaths && isWithinDistance ? item : null;
        }
        return null;
      }));

      //build location filter for map icon
      const validFilteredItems = newFilteredItems.filter(item => item !== null);
      setFilteredItems(validFilteredItems);

      setFilteredItems(newFilteredItems.filter(item => item !== null));
      const validFilteredLocations = locations.filter((_, index) => validFilteredItems.some(item => item.id === apartmentItems[index].id));
      
      setFilteredLocations(validFilteredLocations);
    };
  
    filterItems();
  }, [apartmentItems, locations, priceRange, distRange, bedNum, bathNum]); 

  return (
    <div style={{ display: 'flex', padding: '30px', flexDirection: 'column' }}>
      {/* Map Section */}
      <div style={{ position: 'fixed', width: '600px', height: '1000px', top: '100px', left: '30px', zIndex: 1000 }}>
      <Maps locations={filteredLocations} /> 

      </div>
      
      {/* Apartment Listings */}
      <div style={{ marginLeft: '640px', flexGrow: 2, paddingTop: '10px', overflowY: 'auto'}}>
        <ApartmentFilter 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
          distRange={distRange}
          setDistRange={setDistRange}
          bedrooms={bedNum}
          setBedrooms = {setBedNum}
        bathrooms={bathNum}
        setBathrooms={setBathNum}
        /> 
        <Grid container spacing={3} style={{ padding: '5px' }}>
          {filteredItems.map((item) => (
            <Grid size="auto" key={item.id}>
              <ApartmentCard
                title={item.description || "Apartment"}
                address={item.location}
                price={`$${item.price}`}
                imageUrl={item.pics[0] || "https://via.placeholder.com/345x140"}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Listings;
