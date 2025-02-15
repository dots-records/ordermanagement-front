import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../Box.css';
import TableNotifications from "./components/TableNotifications"
import Pagination from "./components/TableNotifications"


const BoxNotificationCenter = ({notificationsPage, setNotificationsPage, loadingNotifications, setLoadingNotifications}) => {
    return (
        
        <Box
        sx={{
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.10)',
        borderRadius: 2,
        p: 2,
        pb: 0,
        position: 'relative' // Agrega position relative al contenedor de la tabla
        }}
    >
                <Typography
                    sx={{
                        textAlign: 'left', // Alineación del texto
                        fontFamily: 'InterBold', // Familia de la fuente
                        fontSize: 19, // Tamaño de la fuente
                    }}
                >
                    Notification Center
                </Typography>
                <TableNotifications 
                notifications={notificationsPage?.content} 
                loading={loadingNotifications}
            />
            </Box>
    );
};

export default BoxNotificationCenter;
