import {
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  Button,
  Checkbox,
  Chip
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SelectedProvider = ({ provider }) => {
    if (!provider) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    py: '0.5rem'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        color: 'rgba(0,0,0,0.5)',
                    }}
                >
                    Provider Not Available
                </Typography>
            </Box>
        );
        
    }

    return (
        <ListItem
            sx={{
                borderBottom: '0.0625rem solid #ededed',
                gap: '1rem',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap:  '0.5rem',
                    fontFamily: 'InterSemiBold',
                    fontSize: '0.7rem',
                    color: 'rgba(0,0,0,0.8)',
                    backgroundColor:
                    provider.type === 'In Stock'
                        ? 'rgba(255, 207, 63, 0.12)'
                        : 'rgba(126, 202, 63, 0.12)',
                    border:
                    provider.type === 'In Stock'
                        ? '1px solid rgba(255, 207, 63, 0.45)'
                        : '1px solid rgba(126, 202, 63, 0.45)',
                    borderRadius: '4rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    px: '0.7rem',
                    py: '0.15rem',
                }}
            >
                <Box>
                    {provider.discCondition}
                </Box>
                <Box sx={{ opacity: 0.75 }}>
                    {provider.sleeveCondition}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    sx={{
                        fontFamily: 'InterSemiBold',
                        fontSize: '0.75rem',
                        color: 'rgba(0,0,0,0.85)',
                    }}
                >
                    {provider.price} €
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'InterRegular',
                        fontSize: '0.6rem',
                        color: 'rgba(0,0,0,0.5)',
                    }}
                >
                    {provider.type}
                    {provider.description && ` · ${provider.description}`}
                </Typography>
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex'}}>
                {provider.type === 'Online' && (
                    
                    <IconButton
                        size="small"
                        onClick={() => window.open(provider.link, "_blank")}
                        sx={{
                            color: 'rgba(0,0,0,0.45)',
                            '&:hover': {
                                color: 'rgba(0,0,0,0.85)',
                            },
                        }}
                    >
                        <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                )}
            </Box>        
        </ListItem>
    );
}

export default SelectedProvider;
