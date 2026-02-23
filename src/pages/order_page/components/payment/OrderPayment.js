import { Box, Typography, List, ListItem, IconButton,
    CircularProgress,  } from "@mui/material";
import PaymentAdd from "./components/PaymentAdd";
import PaymentInfo from "./components/PaymentInfo";


const OrderPayment = ({ order, loading, fetchOrder }) => {

    

    if (loading) {
        return (
            <Box className="box-container" sx={{ width: "200px" }}>
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: 18 
                    }}
                >
                    Payment
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
                    <CircularProgress size={24} />
                </Box>
            </Box>
        );
    }

    const isOrderFullyAssociated = order.items?.every(
        item => item.associated === true
    );

    return (
        
        <Box className="box-container" sx={{ width: "280px" }}>
            <Box sx={{ display: 'flex', mb: 2}}>
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: 18 
                    }}
                >
                    Payment
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <PaymentAdd order={order} fetchOrder={fetchOrder} isOrderFullyAssociated={isOrderFullyAssociated}/>
                    
                </Box>
            </Box>
            
                <PaymentInfo order={order} isOrderFullyAssociated={isOrderFullyAssociated}/>
            
        </Box>
    );
};

export default OrderPayment;
