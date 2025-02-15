
import ShippingBar from '../status_bar/ShippingBar';
import PaymentReceivedBar from '../status_bar/PaymentReceivedBar';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Typography} from '@mui/material';
import InProgressBar from '../status_bar/InProgressBar';

export const getBoxColor = (status, archived) => {
    if(!archived) {
        switch (status) {
            case 'Payment Received':
                return "rgba(253, 214, 103,"; 
            case 'Invoice Sent':
                return "rgba(255, 173, 201,"
            case 'In Progress':
                return "rgba(86, 147, 200,"
            case 'Shipped':
                return "rgba(145, 190, 89,"
            case 'Payment Pending':
                return "rgba(255, 173, 201,"
            default:
                return "rgba(167, 101, 66,"
        }
    } else {
        return "rgba(39, 33, 60,";
    }
    
}


export const getBar = (status, orderId, tableSelected, setOrdersPage, numberPage, searchTerm) => {
    switch (status) {
        case 'Payment Received':
            return <PaymentReceivedBar orderId={orderId} tableSelected={tableSelected}
            numberPage = {numberPage} setOrdersPage={setOrdersPage} searchTerm={searchTerm} />; 
        case 'In Progress':
            return <InProgressBar orderId={orderId} tableSelected={tableSelected} 
            numberPage = {numberPage}  setOrdersPage={setOrdersPage} searchTerm={searchTerm}/>; 
        case 'Shipped':
            return <ShippingBar />; 
        case 'Cancelled (Per Buyer\'s Request)':
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        mr: 3.9,
                    }}
                >
                    <DoNotDisturbIcon />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13, textAlign: 'center' }}>
                        Cancelled (Per Buyer's Request)
                    </Typography>
                </Box>
            );
        case 'Cancelled (Non-Paying Buyer)':
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        mr: 3.9,
                    }}
                >
                    <DoNotDisturbIcon />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13, textAlign: 'center' }}>
                        Cancelled (Non-Paying Buyer)
                    </Typography>
                </Box>
            );
        case 'Cancelled (Item Unavailable)':
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        mr: 3.9,
                    }}
                >
                    <DoNotDisturbIcon />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13, textAlign: 'center' }}>
                        Cancelled (Item Unavailable)
                    </Typography>
                </Box>
            );
        case 'Invoice Sent':
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        ml: 1.9,
                    }}
                >
                    <ReceiptIcon />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13, textAlign: 'center' }}>
                        Invoice Sent
                    </Typography>
                </Box>
            );
        case 'Payment Pending':
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        mr: 4,
                    }}
                >
                    <AutorenewIcon />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13, textAlign: 'center' }}>
                        Payment Pending
                    </Typography>
                </Box>
            );
        default:
            return (
                <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13, textAlign: 'center' }}>
                    Not defined
                </Typography>
            );
    }
};
