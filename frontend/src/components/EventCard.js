import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom'; 
import imageMapping from '../services/imageMapping'; 
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'; 
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const EventCard = ({ event, selectedCity }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {     
        const eventDate = event.startPoint;
        //const formattedDate = eventDate.toISOString().slice(0, 19); // Format to 'yyyy-MM-ddTHH:mm:ss'
        navigate(`/events/${encodeURIComponent(selectedCity)}/${encodeURIComponent(event.description)}/${encodeURIComponent(event.name)}/${eventDate}`);
    };

    const imagePath = imageMapping[event.description];

    return (
        <Card sx={{ maxWidth: 345, margin: 2, backgroundColor: 'white' }} onClick={handleCardClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={imagePath}
                    alt={event.description}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {event.description}                        
                    </Typography>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                        <LocationOnOutlinedIcon sx={{ marginRight: 1 }} /> 
                        {event.name}                       
                    </Typography>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                        <CalendarMonthOutlinedIcon sx={{ marginRight: 1 }} />
                        {new Date(event.startPoint).toLocaleDateString('en-GB')} 
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;