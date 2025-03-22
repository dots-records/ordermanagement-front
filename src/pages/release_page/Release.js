import DotsDrawer from '../../globalComponents/drawer/DotsDrawer';
import DotsAppBar from '../../globalComponents/app_bar/DotsAppBar';
import { Box } from '@mui/material';
import { appBarHeight } from '../../config/constants';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRelease } from '../../services/releaseService';
import { getListings } from '../../services/listingService';
import { getProviders } from '../../services/providerService';
import ReleaseInfo from './components/information/ReleaseInfo';
import ReleaseListings from './components/listings/ReleaseListings';
import ReleaseProviders from './components/providers/ReleaseProviders';

const Release = () => {
    const { releaseId } = useParams();
    const [release, setRelease] = useState();
    const [listings, setListings] = useState();
    const [providers, setProviders] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(releaseId);
                const dataReleases = await getRelease(releaseId);
                setRelease(dataReleases);
                const dataListings = await getListings(releaseId);
                setListings(dataListings);
                const dataProviders = await getProviders(releaseId);
                setProviders(dataProviders);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <DotsAppBar />
            <DotsDrawer />
            {/* Caja que delimita con el drawer y el appbar y contiene el resto de la pantalla */}
            <Box
                sx={{
                    p: 3,
                    mt: `${appBarHeight}px`,
                    boxShadow: 'none',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 , alignItems: 'flex-start'}}>
                    <ReleaseInfo release={release} loading={loading} />
                    <ReleaseListings listings={listings} loading={loading} />
                    <ReleaseProviders providers={providers} loading={loading} />
                </Box>
            </Box>
        </Box>
    );
};

export default Release;
