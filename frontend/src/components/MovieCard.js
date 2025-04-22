import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom'; 
import imageMapping from '../services/imageMapping'; 
import TheatersIcon from '@mui/icons-material/Theaters';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {     
        navigate(`/movies/${movie.startPoint}`); 
    };

    const imagePath = imageMapping[movie.description];

    return (
        <Card sx={{ maxWidth: 345, margin: 2, backgroundColor: 'black' }} onClick={handleCardClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200" // Increased height for the image
                    image={imagePath}
                    alt={movie.description}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color='white' display="flex" alignItems="center">
                    <TheatersIcon sx={{ marginRight: 1 }} />
                        {movie.description}                        
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MovieCard;