import dynamic from 'next/dynamic';

const Maps = dynamic(() => import('../listings/Map'), { 
  ssr: false 
});

interface Location {
    latitude: number;
    longitude: number;
  }
  
 
  interface MapCardProps {
    locations: Location[]; 
  }
  
  const MapCard: React.FC<MapCardProps> = ({ locations }) => {
    return (
      <div style={{ height: '60%', width: '100%' }}>
        <Maps locations={locations} /> 
      </div>
    );
  };
export default MapCard;
