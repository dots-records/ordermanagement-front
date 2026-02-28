import {Box, Typography} from '@mui/material';
import logo_cropped from '../../files/logo_cropped.png';

const DotsAppBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        borderBottom: '0.08rem solid rgba(0,0,0,0.15)',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo a la izquierda */}
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent:'center',
            width: '3rem',
            p: '0.8rem',
            
        }}>

            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                
            }}>
                <img
                    src={logo_cropped}
                    alt="Logo"
                    style={{ 
                        width: '1.5rem', 
                        height: 'auto', 
                        display: 'block', 
                        opacity: 0.8, }}
                />


            </Box>
            
                 
        </Box>
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent:'center',
            py: '0.8rem',
            
        }}>
        </Box>
        
    </Box>
  );
};

export default DotsAppBar;