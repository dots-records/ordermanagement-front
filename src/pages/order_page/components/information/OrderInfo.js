import { useState } from "react";
import { IconButton, Box, Typography, Paper, Divider } from "@mui/material";

const OrderInfo = ({ order, loading }) => {

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Box className="box-container" sx={{width: "250px"}}>
            <Typography 
                sx={{ 
                    textAlign: "left", 
                    fontFamily: "InterBold", 
                    fontSize: 18 
                }}
            >
                Information
            </Typography>


            <Divider sx={{ my: 2, backgroundColor: "rgba(0,0,0,0.2)" }} />
           
        </Box>
    );
};

export default OrderInfo;
