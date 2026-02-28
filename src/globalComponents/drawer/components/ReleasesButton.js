
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import Typography from '@mui/material/Typography';


const ReleasesButton = ({ selected, open }) => {

    return (
        <ListItemButton  
            sx={{ 
                py: '0.8rem',
                color: selected ? 'black' : 'rgba(0,0,0,0.4)',
                '& .MuiSvgIcon-root': {
                        color: selected ? 'black' : 'rgba(0,0,0,0.4)',
                },
                '&:hover': {
                    color: 'rgba(0,0,0,1)', 
                    '& .MuiSvgIcon-root': {
                        color: 'black',
                    }
                },
                borderBottom: '0.08rem solid rgba(0,0,0,0.05)'
            }}
        >
            <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'flex-start': 'center',
                    gap: '0.6rem',
                    width: '100%',
                }}
            >
                <InventoryIcon sx={{fontSize: '1.2rem',}}/>
                {open && (
                    <Typography
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: '1rem',
                        }}
                    >
                        Releases
                    </Typography>
                )}

            </Box>
            
        </ListItemButton>
    );
}

export default ReleasesButton;
