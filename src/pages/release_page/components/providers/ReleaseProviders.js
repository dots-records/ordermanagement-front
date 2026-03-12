import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProviderAdd from './ProviderAdd';
import ProviderTable from './table/ProviderTable';
import {CircularProgress} from "@mui/material";

const ReleaseProviders = ({ providers, loading, releaseId, setProviders, setLoading }) => {
    
    if (loading) {
        return (
            <Box className="box-container" sx={{ width: '75%', height: '85vh', }}>
                <Box sx={{ display: 'flex'}}>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            fontFamily: 'InterBold',
                            fontSize: '1.1875rem',
                        }}
                    >
                        Providers & Listings
                    </Typography>
                </Box>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        width: "100%", 
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',  
                    }}
                >
                    <CircularProgress size={'1.5rem'} />
                </Box>
            </Box>
        );
    }

    return (
        <Box className="box-container" sx={{width: '75%', height: '85vh', display: 'flex',
                flexDirection: 'column', gap: '1rem', overflowX: "hidden", overflowY: 'auto'}}>
            <Box sx={{ display: 'flex'}}>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontFamily: 'InterBold',
                        fontSize: '1.1875rem',
                    }}
                >
                    Providers & Listings
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <ProviderAdd releaseId={releaseId} 
                    setProviders={setProviders} setLoading={setLoading}/>
                </Box>
            </Box>

            <ProviderTable providers={providers} setProviders={setProviders} setLoading={setLoading} 
            releaseId={releaseId}/>
        </Box>
    );
};

export default ReleaseProviders;