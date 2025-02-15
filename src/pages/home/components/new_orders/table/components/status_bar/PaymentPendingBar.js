import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Typography } from '@mui/material';
const PaymentPendingBar = () => {
    return (
        
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',

        }}
    >
        <AutorenewIcon sx ={{mb: 0.3, fontSize: 22.5}} />
        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12.5, textAlign: 'center'}}>
            Payment Pending
        </Typography>
    </Box>
    )
}

export default PaymentPendingBar;
