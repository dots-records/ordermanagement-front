import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProviderAdd from './ProviderAdd';
import ProviderTable from './table/ProviderTable';
import {CircularProgress} from "@mui/material";

const ReleaseProviders = ({ providers, loading, releaseId, setProviders, setLoading }) => {
    if (loading) {
        return (
            <Box className="box-container" sx={{ width: "650px" }}>
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
                    <CircularProgress size={24} />
                </Box>
            </Box>
        );
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

            <ProviderTable providers={providers} setProviders={setProviders} setLoading={setLoading} 
            releaseId={releaseId}/>
        </Box>
    );
};

export default ReleaseProviders;