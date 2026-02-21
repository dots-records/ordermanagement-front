import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import design from '../../files/design.png'
import { drawerWidth, appBarHeight } from '../../config/constants';


const DotsAppBar = () => {

    return (
        <AppBar position="fixed" sx={{ width: '100%', ml: `${drawerWidth}px`, height: appBarHeight, color: 'black', backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none', borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.2)'}}>
            <Toolbar>
                <Typography variant="h5" sx={{ fontFamily: 'InterExtraBold' }}>
                Dots
                </Typography>
                <Box sx= {{ width: '20', ml :1}}>
            <img src={design} alt="Descripción de la imagen"style={{ width: '40px', height: 'auto' }}/>
            </Box>
            </Toolbar>
        </AppBar>
    );
}

export default DotsAppBar;
