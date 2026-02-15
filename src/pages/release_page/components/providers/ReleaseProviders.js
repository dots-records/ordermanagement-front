import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProviderAdd from './ProviderAdd';
import ProviderTable from './table/ProviderTable';

const ReleaseProviders = ({ providers, loading, releaseId, setProviders, setLoading }) => {
    if (loading) {
            return <Typography>Cargando...</Typography>;
        }
    return (
        <Box className="box-container" sx={{ width: '650px' }}>
            <Box sx={{ display: 'flex', mb: 2}}>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontFamily: 'InterBold',
                        fontSize: 19,
                    }}
                >
                    Providers & Listings
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <ProviderAdd releaseId={releaseId} 
                    setProviders={setProviders} setLoading={setLoading}/>
                </Box>
            </Box>

            <ProviderTable providers={providers} loading={loading} setProviders={setProviders} setLoading={setLoading} 
            releaseId={releaseId}/>
        </Box>
    );
};

export default ReleaseProviders;