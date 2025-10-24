import ShippingBar from '../status_bar/ShippingBar';
import PaymentReceivedBar from '../status_bar/PaymentReceivedBar';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Typography } from '@mui/material';
import InProgressBar from '../status_bar/InProgressBar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const getBoxColor = (status, archived) => {
    if (!archived) {
        switch (status) {
            case 'Payment Received':
                return "rgba(255, 207, 63,"; 
            case 'Invoice Sent':
                return "rgba(247, 120, 188,"; 
            case 'In Progress':
                return "rgba(51, 173, 255,"; 
            case 'Shipped':
                return "rgba(126, 202, 63,"; 
            case 'Payment Pending':
                return "rgb(251, 140, 75,"
            default:
                return "rgba(158, 158, 158,"; 
        }
    } else {
        return "rgba(144, 144, 162,"; // Gris oscuro elegante para archivados
    }
};
export const getBar = (status, orderId, tableSelected, setOrdersPage, numberPage, searchTerm) => {
    const boxSx = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    };

    switch (status) {
        case 'Payment Received':
            return <PaymentReceivedBar orderId={orderId} tableSelected={tableSelected} numberPage={numberPage} setOrdersPage={setOrdersPage} searchTerm={searchTerm} />;
        case 'In Progress':
            return <InProgressBar orderId={orderId} tableSelected={tableSelected} numberPage={numberPage} setOrdersPage={setOrdersPage} searchTerm={searchTerm} />;
        case 'Shipped':
            return <ShippingBar />;
        case 'Cancelled (Per Buyer\'s Request)':
            return (
                <Box sx={{ ...boxSx}}>
                    <DoNotDisturbIcon fontSize="small"/>
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textAlign: 'center', mt: 0.5 }}>
                        Cancelled (Per Buyer's Request)
                    </Typography>
                </Box>
            );
        case 'Cancelled (Non-Paying Buyer)':
            return (
                <Box sx={{ ...boxSx }}>
                    <DoNotDisturbIcon fontSize="small" />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textAlign: 'center', mt: 0.5  }}>
                        Cancelled (Non-Paying Buyer)
                    </Typography>
                </Box>
            );
        case 'Cancelled (Item Unavailable)':
            return (
                <Box sx={{ ...boxSx }}>
                    <DoNotDisturbIcon fontSize="small" />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textAlign: 'center', mt: 0.5  }}>
                        Cancelled (Item Unavailable)
                    </Typography>
                </Box>
            );
        case 'Invoice Sent':
            return (
                <Box sx={{ ...boxSx }}>
                    <ReceiptIcon fontSize="small" />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textAlign: 'center', mt: 0.5 }}>
                        Invoice Sent
                    </Typography>
                </Box>
            );
        case 'Payment Pending':
            return (
                <Box sx={{ ...boxSx }}>
                    <AutorenewIcon fontSize="small" />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textAlign: 'center', mt: 0.5 }}>
                        Payment Pending
                    </Typography>
                </Box>
            );
        case 'Other':
            return (
                <Box sx={{ ...boxSx }}>
                    <MoreHorizIcon fontSize="small" />
                    <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textAlign: 'center', mt: 0.5  }}>
                        Other
                    </Typography>
                </Box>
            );
        default:
            return (
                <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textAlign: 'center' }}>
                    Error, Not defined
                </Typography>
            );
    }
};
