import { Box, Typography, List, ListItem, IconButton, CircularProgress } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TableItems from "./table/TableItems";
import '../../../../globalComponents/Box.css';

const OrderItems = ({ order, loading, fetchOrder }) => {

    if (loading) {
        return (
            <Box className="box-container" sx={{ width: "40%" }}>
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: "1.125rem"
                    }}
                >
                    Items
                </Typography>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        width: "100%", 
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',  
                    }}
                >
                    <CircularProgress size={'2rem'} />
                </Box>
            </Box>
        );
    }
    return (
        <Box className="box-container" 
            sx={{ 
                width: "40%",
                maxHeight: "35vh",
                overflowY: "auto",  
                overflowX: "hidden"   
            }}
        >
            <Typography 
                sx={{ 
                    textAlign: "left", 
                    fontFamily: "InterBold", 
                    fontSize: "1.125rem"
                }}
            >
                Items
            </Typography>

            <TableItems order={order} fetchOrder={fetchOrder}/>
        </Box>
    );
};

export default OrderItems;
