import DotsDrawer from '../../globalComponents/drawer/DotsDrawer';
import DotsAppBar from '../../globalComponents/app_bar/DotsAppBar';
import {Box } from '@mui/material';
import { appBarHeight } from '../../config/constants';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getRelease } from '../../services/releaseService';
import ReleaseInfo from './components/ReleaseInfo';


const Release = () => {

    const { releaseId } = useParams();
    const [release, setRelease] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
                try {
                    console.log(releaseId)
                    const data = await getRelease(releaseId);
                    
                    setRelease(data);
                    setLoading(false)
                } catch(err) {
                    console.log(err);
                }
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
                      boxShadow: 'none',
                  }}
              >
                 <ReleaseInfo release = {release} loading={loading}>

                 </ReleaseInfo>
              </Box>
          </Box>
        
    );
}

export default Release;