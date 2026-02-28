import * as React from 'react';
import { Box, List, IconButton, ListItemButton, Typography} from '@mui/material';
import { Link, useLocation  } from 'react-router-dom';
import HomeButton from './components/HomeButton';
import OrdersButton from './components/OrdersButton'
import ReleasesButton from './components/ReleasesButton'
import MenuIcon from '@mui/icons-material/Menu';
import PaymentsButton from './components/PaymentsButton';



const DotsDrawer = () => {

  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  

  return (
    <Box
      sx={{
        width: open ? '12rem' : '3rem',        
        display: 'flex',
        flexDirection: 'column',
        borderRight: '0.08rem solid rgba(0,0,0,0.15)',
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <List sx={{width: '100%', py: 0}}>
        <ListItemButton 
          onClick={() => setOpen(!open)} 
          sx={{ 
            justifyContent: open ? 'flex-end' : 'center', 
            py: '0.8rem',
            '& .MuiSvgIcon-root': {
              color: 'rgba(0,0,0,0.4)' ,
            },
            '&:hover': {
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
              justifyContent: open ? 'flex-end' : 'center',
              gap: '0.6rem',
              width: '100%',
            }}
          >
            <MenuIcon sx={{fontSize: '1.2rem',}}/>
          </Box>
        </ListItemButton>
        <Link to={`/`} style={{ textDecoration: 'none'}}>
          <HomeButton selected={location.pathname === '/'} open={open}/>
        </Link>

        <Link to={`/orders`} style={{ textDecoration: 'none'}}>
          <OrdersButton selected={location.pathname === '/orders'}  open={open}/>
        </Link>

        <Link to={`/releases`} style={{ textDecoration: 'none'}}>
          <ReleasesButton selected={location.pathname === '/releases'} open={open}/>
        </Link>

        <Link to={`/payments`} style={{ textDecoration: 'none'}}>
          <PaymentsButton selected={location.pathname === '/payments'} open={open}/>
        </Link>
        
      </List>
      
    </Box>
  );
}

export default DotsDrawer;