import { useParams } from 'react-router-dom';
import {Box } from '@mui/material';
import {useState, useEffect} from 'react';
import DotsDrawer from '../../globalComponents/drawer/DotsDrawer';
import DotsAppBar from '../../globalComponents/app_bar/DotsAppBar';
import { appBarHeight } from '../../config/constants';
import BoxReleases from './components/BoxReleases'
import { getSelectedTableReleases } from './functions/Functions';

const Releases = () => {
    const [loading, setLoading] = useState(true);
    const [releasesPage, setReleasesPage] = useState(null);

    useEffect(() => {
                const fetchData = async () => {
                    setLoading(true)
                    const response = await getSelectedTableReleases('Active Releases', 0, "")
                    setReleasesPage(response)
                    setLoading(false)
                };
                fetchData();
        }, []);


    return (
      <Box sx={{ display: 'flex' }}>
            <DotsAppBar />
            <DotsDrawer />
            {/* Caja que delimita con el drawer y el appbar y contiene el resto de la pantalla*/}
            <Box
                sx={{
                    p: 3,
                    mt: `${appBarHeight}px`,
                    width: "100vw",
                    height: "40vh",
                    position: 'relative' // Agrega position relative al contenedor principal
                }}
            >
                <BoxReleases  
                    loading={loading}
                    setLoading={setLoading}
                    releasesPage = {releasesPage}
                    setReleasesPage = {setReleasesPage}
                />
                
            </Box>
        </Box>
      
  );
}

export default Releases;
