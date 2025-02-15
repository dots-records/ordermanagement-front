import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import HomeButton from './components/HomeButton';
import OrdersButton from './components/OrdersButton'
import { drawerWidth, appBarHeight } from '../../config/constants';
import ReleasesButton from './components/ReleasesButton'

const buttonMargain = 15;

const DotsDrawer = () => {

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          height: 'calc(100% - 70px)',
          transform: `translateY(${appBarHeight}px)`
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>

        <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <HomeButton drawerWidth={drawerWidth} buttonMargain={buttonMargain} />
        </Link>

        <Link to={`/orders`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <OrdersButton drawerWidth={drawerWidth} buttonMargain={buttonMargain} />
        </Link>

        <Link to={`/releases`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ReleasesButton drawerWidth={drawerWidth} buttonMargain={buttonMargain} />
        </Link>
        
      </List>

      <Divider sx={{ borderWidth: 2, borderColor:'rgba(0,0,0,0.2)'}} />

    </Drawer>
  );
}

export default DotsDrawer;