import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, Typography } from '@mui/material';
const InvoiceSentBar = () => {
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
            <ReceiptIcon sx ={{mb: 0.3, fontSize: 22.5}} />
            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12.5, textAlign: 'center' }}>
                Invoice Sent
            </Typography>
        </Box>
    )
}

export default InvoiceSentBar;
