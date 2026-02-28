
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';


const HomeButton = ({ selected, open }) => {

    return (
        <ListItemButton  
            sx={{ 
                width: '100%',
                py: '0.8rem',
                color: selected ? 'black' : 'rgba(0,0,0,0.4)',
                '& .MuiSvgIcon-root': {
                        color: selected ? 'black' : 'rgba(0,0,0,0.4)',
                },
                '&:hover': {
                    color: 'black', 
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
                <HomeIcon sx={{fontSize: '1.2rem',}}/>
                {open && (
                    <Typography
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: '1rem',
                        }}
                    >
                        Home
                    </Typography>
                )}
                

            </Box>
        </ListItemButton>
    );
}

export default HomeButton;
