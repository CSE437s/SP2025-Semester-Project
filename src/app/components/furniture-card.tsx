import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface FurnitureCardProps {
  title: string;
  price: string;
  imageUrl: string;
}

 const FurnitureCard = ({ title,  price, imageUrl }: FurnitureCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
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
export default FurnitureCard;