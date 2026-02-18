import { Box, Typography, List, ListItem, IconButton } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TableItems from "./table/TableItems";

const OrderItems = ({ order, loading, fetchOrder }) => {
    return (
        <Box className="box-container" sx={{ width: "400px" }}>
            <Typography 
                sx={{ 
                    textAlign: "left", 
                    fontFamily: "InterBold", 
                    fontSize: 18 
                }}
            >
                Items
            </Typography>

            <TableItems order={order} loading={loading} fetchOrder={fetchOrder}/>
        </Box>
    );
};

export default OrderItems;
