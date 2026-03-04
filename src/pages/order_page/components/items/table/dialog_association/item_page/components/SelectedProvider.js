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
            <Box sx={{width: '100%', justifyItems: 'center'}}>
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        color: 'rgba(0,0,0,0.4)',
                        py: '0.5rem'
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
                    gap: '0.6rem',
                    fontFamily: 'InterSemiBold',
                    fontSize: '0.78125rem',
                    color: 'rgba(0,0,0,0.8)',
                    backgroundColor:
                    provider.type === 'In Stock'
                        ? 'rgba(255, 207, 63, 0.12)'
                        : 'rgba(126, 202, 63, 0.12)',
                    border:
                    provider.type === 'In Stock'
                        ? '0.0625rem solid rgba(255, 207, 63, 0.45)'
                        : '0.0625rem solid rgba(126, 202, 63, 0.45)',
                    borderRadius: '4rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    px: '0.7rem',
                    py: '0.15rem',
                }}
            >
                <Box >
                    {provider.discCondition}
                </Box>
                <Box sx={{  opacity: 0.75 }}>
                    {provider.sleeveCondition}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    sx={{
                        fontFamily: 'InterSemiBold',
                        fontSize: '0.8125rem',
                        color: 'rgba(0,0,0,0.85)'
                    }}
                >
                    {provider.price} €
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'InterRegular',
                        fontSize: '0.65625rem',
                        color: 'rgba(0,0,0,0.5)',
                        whiteSpace: 'normal',    
                        wordBreak: 'break-word',  
                        overflowWrap: 'anywhere',
                    }}
                >
                    {provider.type}
                    {provider.description && ` · ${provider.description}`}
                </Typography>
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {provider.type === 'In Stock' ? (
                    <Chip
                        label={`${provider.units} units`}
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: '0.75rem',
                            borderRadius: '6px',
                            bgcolor: 'rgba(25, 118, 210, 0.08)',
                            color: '#1976d2',
                            height: '1.375rem',
                        }}
                    />
                ) : (
                    <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                fontFamily: 'InterSemiBold',
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                borderRadius: '0.375rem',
                                gap: '0.5rem',
                                height: '1.375rem',
                                color: '#1976d2',
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(provider.link, '_blank');
                            }}
                        >
                        Open
                        <OpenInNewIcon sx={{fontSize: '0.75rem',color: '#1976d2',}} />
                    </Button>
                )}
            </Box>        
        </ListItem>
    );
}

export default SelectedProvider;
