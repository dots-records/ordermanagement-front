import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListingAdd from './ListingAdd';

const ReleaseListings = ({ listings, loading }) => {
    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Box className="box-container" sx={{ width: "400px"}}>
            <Box sx={{ display: 'flex',mb:2}}>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontFamily: 'InterBold',
                        fontSize: 19,
                    }}
                >
                    Listings
                </Typography>
                <Box sx={{ ml: "auto" }}>  
                    <ListingAdd />
                </Box>
            </Box>
        
            <List >
                {listings.map((listing, index) => (
                    <ListItem 
                        key={index} 
                        sx={{ borderBottom: '1px solid #ddd', cursor: 'pointer'}} 
                        onClick={() => window.open(listing.url, '_blank')}
                    >
                        <ListItemText
                            primary={`ID: ${listing.releaseId} - Tipo: ${listing.type}`}
                            secondary={listing.url}
                            
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ReleaseListings;
