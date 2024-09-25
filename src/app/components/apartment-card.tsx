import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ApartmentCardProps {
  title: string;
  address: string;
  price: string;
  imageUrl: string;
}

export const ApartmentCard = ({ title, address, price, imageUrl }: ApartmentCardProps) => {
  return (
    <Card sx={{ maxWidth: 280, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia component="img" height="120" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" color="primary">
            {price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
