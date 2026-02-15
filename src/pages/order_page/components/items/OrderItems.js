import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem } from "@mui/material";

const OrderItems = ({ order, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Box className="box-container" sx={{ width: "350px" }}>
            <Typography 
                sx={{ 
                    textAlign: "left", 
                    fontFamily: "InterBold", 
                    fontSize: 18 
                }}
            >
                Items
            </Typography>

            <List>
                {order?.items.map((item, index) => (
                    <ListItem
                        key={index}
                        onClick={() => navigate(`/releases/${item.release.id}`)}
                        sx={{ 
                            borderBottom: '1px solid #ddd',
                            gap: 2,
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.03)' }
                        }}
                    >
                        <img 
                            src={item.release.thumb} 
                            style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '3px'}}
                        />
                        <Box> 
                            <Typography sx={{ fontFamily: 'InterBold', fontSize: 13 , color: 'rgba(0,0,0,0.70)', textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>
                                {item.release.name}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 10, color: 'rgba(0,0,0,0.5)',}}>
                                {item.release.artists.map(artist => artist.name).join(', ')}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default OrderItems;
