import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../Box.css';
import TableNewOrders from './table/TableNewOrders'


const BoxNewOrders = ({newOrders, loading, setNewOrders}) => {
    return (
        
            <Box className="box-container">
                <Typography
                    sx={{
                        textAlign: 'left', // Alineación del texto
                        fontFamily: 'InterBold', // Familia de la fuente
                        fontSize: 19, // Tamaño de la fuente
                    }}
                >
                    Changes
                </Typography>
                
            </Box>
    );
};

export default BoxNewOrders;
