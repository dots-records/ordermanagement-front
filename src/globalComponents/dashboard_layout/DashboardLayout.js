import Box from '@mui/material/Box';
import DotsAppBar from '../app_bar/DotsAppBar';
import DotsDrawer from '../drawer/DotsDrawer';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <DotsAppBar />
      <Box sx={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.015)', flexGrow: 1}}>
        <DotsDrawer/>
        <Box
          sx={{
            flexGrow: 1,
            p: '1.5rem'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;