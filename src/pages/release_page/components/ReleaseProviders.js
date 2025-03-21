import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListingAdd from './ListingAdd';
import ProviderAdd from './ProviderAdd';

const ReleaseProviders = ({ listings, loading }) => {
    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Box className="box-container" sx={{ width: "400px"}}>
            <Box sx={{ display: 'flex',mb:2, border: "1px solid black"}}>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontFamily: 'InterBold',
                        fontSize: 19,
                    }}
                >
                    Providers
                </Typography>
                <Box sx={{ ml: "auto" }}>  
                    <ProviderAdd />
                </Box>
            </Box>
        
            
        </Box>
    );
};

export default ReleaseProviders;
