import { Box, Typography, List, ListItem, IconButton,
    CircularProgress,  } from "@mui/material";
import PaymentAdd from "./components/PaymentAdd";
import PaymentInfo from "./components/PaymentInfo";


const OrderPayment = ({ order, loading, fetchOrder }) => {

    

    if (loading) {
        return (
            <Box className="box-container" sx={{ width: "30%" }}>
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: '1.125rem' 
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
                    <CircularProgress size={'1.5rem'} />
                </Box>
            </Box>
        );
    }

    const isOrderFullyAssociated = order.items?.every(
        item => item.associated === true
    );

    return (
        
        <Box className="box-container" sx={{ width: "30%", overflowY: "auto",  
                overflowX: "hidden"   }}>
            <Box sx={{ display: 'flex'}}>
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: '1.125rem' 
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
