import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DotsAppBar from "../../globalComponents/app_bar/DotsAppBar";
import DotsDrawer from "../../globalComponents/drawer/DotsDrawer";

const Home = () => {
    

    
    return (
        <Box sx={{ display: 'flex' }}>
            <DotsAppBar />
            <DotsDrawer />
            
        </Box>
    );
}

export default Home;
