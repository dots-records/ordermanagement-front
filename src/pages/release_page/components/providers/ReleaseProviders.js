import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ProviderAdd from './ProviderAdd';
import ProviderTable from './ProviderTable';

const ReleaseProviders = ({ providers, loading, releaseId, setProviders, setLoading }) => {
    

    return (
        <Box className="box-container" sx={{ width: '400px' }}>
            <Box sx={{ display: 'flex', mb: 2}}>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontFamily: 'InterBold',
                        fontSize: 19,
                    }}
                >
                    Providers
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <ProviderAdd releaseId={releaseId} 
                    setProviders={setProviders} setLoading={setLoading}/>
                </Box>
            </Box>

            <ProviderTable providers={providers} loading={loading}   />
        </Box>
    );
};

export default ReleaseProviders;