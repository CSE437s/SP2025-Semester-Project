"use client";

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import FurnitureCard from '../components/furniture-card';
import Filter from '../components/furniture-filter-card';

interface FurnitureItem {
  id: number;
  userId: number; 
  price: number;
  description: string;
  condition: string;
}

const FurniturePage = () => {
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([]);
  const [tags, setTags] = useState<string[]>([]); // State for selected tags
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]); // State for price range

  useEffect(() => {
    const fetchFurnitureItems = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/furniture'); 
        const text = await response.text();
        if (response.ok) {
          const data = JSON.parse(text);
          setFurnitureItems(data);
        } else {
          console.error(`Error: ${response.status} - ${text}`);
        }
      } catch (error) {
        console.error('Error fetching furniture items:', error);
      }
    };

    fetchFurnitureItems();
  }, []);

  const filteredItems = furnitureItems.filter(item => {
    const isInPriceRange = item.price >= priceRange[0] && item.price <= priceRange[1];
    const isTagged = tags.length === 0 || tags.some(tag => item.description.toLowerCase().includes(tag.toLowerCase()));
    return isInPriceRange && isTagged;
  });

  return (
    <div style={{ display: 'flex', padding: '30px' }}>
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <FurnitureCard
                title={item.description} 
                price={`$${item.price}`}
                imageUrl="https://via.placeholder.com/345x140" 
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <div style={{ display: 'flex', marginLeft: '15px' }}>
        <Filter tags={tags} setTags={setTags} priceRange={priceRange} setPriceRange={setPriceRange} /> 
      </div>
    </div>
  );
};

export default FurniturePage;
