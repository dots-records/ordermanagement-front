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
        <Typography
            sx={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.4)',
            px: 1,
            py: 1.4,
            }}
        >
            Info. Not Available
        </Typography>
        );
    }

    return (
        <ListItem
            sx={{
                borderBottom: '1px solid #ededed',
                gap: 2,
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    fontFamily: 'InterSemiBold',
                    fontSize: 12.5,
                    color: 'rgba(0,0,0,0.8)',
                    backgroundColor:
                    provider.type === 'In Stock'
                        ? 'rgba(255, 207, 63, 0.12)'
                        : 'rgba(126, 202, 63, 0.12)',
                    border:
                    provider.type === 'In Stock'
                        ? '1px solid rgba(255, 207, 63, 0.45)'
                        : '1px solid rgba(126, 202, 63, 0.45)',
                    borderRadius: 8,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    px: 1.4,
                    py: 0.6,
                }}
            >
                <Box sx={{ lineHeight: 1 }}>
                    {provider.discCondition}
                </Box>
                <Box sx={{ lineHeight: 1, opacity: 0.75 }}>
                    {provider.sleeveCondition}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    sx={{
                        fontFamily: 'InterSemiBold',
                        fontSize: 13,
                        color: 'rgba(0,0,0,0.85)',
                        mt: -0.2
                    }}
                >
                    {provider.price} €
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'InterRegular',
                        fontSize: 10.5,
                        color: 'rgba(0,0,0,0.5)',
                        mt: -0.3
                    }}
                >
                    {provider.type}
                    {provider.description && ` · ${provider.description}`}
                </Typography>
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
                {provider.type === 'In Stock' ? (
                    <Chip
                        label={`${provider.units} units`}
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: 12,
                            borderRadius: '6px',
                            bgcolor: 'rgba(25, 118, 210, 0.08)',
                            color: '#1976d2',
                            height: 22,
                        }}
                    />
                ) : (
                    <Button
                        variant="outlined"
                        size="small"
                        endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: 12,
                            textTransform: 'none',
                            borderRadius: '6px',
                            px: 1.5,
                            py: 0.3
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(provider.link, '_blank');
                        }}
                    >
                        Open
                    </Button>
                )}
            </Box>        
        </ListItem>
    );
}

export default SelectedProvider;
