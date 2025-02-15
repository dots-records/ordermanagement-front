
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemIcon } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';


const OrdersButton = ({ drawerWidth, buttonMargain }) => {

    return (
        <ListItemButton  
            sx={{ 
                height: 50,
                width: drawerWidth - buttonMargain*2,
                transform: `translateX(${buttonMargain}px)`,
                border: '2px solid transparent',
                color: 'rgba(0, 0, 0, 0.8)',// Color del texto por defecto
                '& .MuiSvgIcon-root': {
                        color: 'rgba(0, 0, 0, 0.35)', // Cambia el color del ícono al hacer hover
                    },
                '&:hover': {
                    border: '2px solid',
                    color: 'rgba(0,0,0,1)', // Cambia el color del texto al pasar el ratón
                    backgroundColor: 'rgba(0,0,0,0.02)', // Cambia el color de fondo al pasar el ratón
                    borderColor: 'rgba(0, 0, 0, 0.2)', 
                    borderWidth: 1.5,
                    '& .MuiSvgIcon-root': {
                        color: 'black', // Cambia el color del ícono al hacer hover
                    }
                },
                borderRadius: 1.5,
            }}
        >
            <ListItemIcon sx={{minWidth: 35}}>
                    <ShoppingCartIcon/>
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'InterSemiBold',  fontSize: 17}} >
                Orders
            </Typography>
        </ListItemButton>
    );
}

export default OrdersButton;
