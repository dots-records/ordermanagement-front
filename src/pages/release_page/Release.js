import DotsDrawer from '../../globalComponents/drawer/DotsDrawer';
import DotsAppBar from '../../globalComponents/app_bar/DotsAppBar';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRelease } from '../../services/releaseService';
import { getProviders } from '../../services/providerService';
import ReleaseInfo from './components/information/ReleaseInfo';
import ReleaseProviders from './components/providers/ReleaseProviders';
import DashboardLayout from '../../globalComponents/dashboard_layout/DashboardLayout';

const Release = () => {
    const { releaseId } = useParams();
    const [release, setRelease] = useState();
    const [providers, setProviders] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(releaseId);
                const dataReleases = await getRelease(releaseId);
                setRelease(dataReleases);
                const dataProviders = await getProviders(releaseId);
                setProviders(dataProviders);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    if (!loading && !release) {
            return (
                <DashboardLayout>
                    <Box
                        className="box-container"
                        sx={{
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'InterSemiBold',
                            fontSize: '0.875rem',
                            color: 'rgba(0,0,0,0.5)',
                        }}
                    >
                        Release not available
                    </Box>
                </DashboardLayout>
            );
        }
    
    return (
        <DashboardLayout>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 , alignItems: 'flex-start', height:'100%'}}>
                <ReleaseInfo release={release} loading={loading} />
                <ReleaseProviders providers={providers} loading={loading} releaseId={releaseId}
                     setProviders={setProviders} setLoading={setLoading}/>
            </Box>
        </DashboardLayout>
    );
};

export default Release;
