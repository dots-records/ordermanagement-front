
import {useState, useEffect} from 'react';
import DashboardLayout from '../../globalComponents/dashboard_layout/DashboardLayout';
import BoxReleases from './components/BoxReleases'
import { getSelectedTableReleases } from './functions/Functions';
import { getReleasesCount } from '../../services/releaseService';

const Releases = () => {
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(null);
    const [releasesPage, setReleasesPage] = useState(null);

    useEffect(() => {
                const fetchData = async () => {
                    setLoading(true)
                    const response = await getSelectedTableReleases('Active Releases', 0, "")
                    setReleasesPage(response)
                    setLoading(false)
                    const responseCount = await getReleasesCount(false);
                    setCount(responseCount)
                };
                fetchData();
        }, []);


    return (
        <DashboardLayout>
            <BoxReleases  
                loading={loading}
                setLoading={setLoading}
                releasesPage = {releasesPage}
                setReleasesPage = {setReleasesPage}
                count = {count}
                setCount = {setCount}
            />
        </DashboardLayout>
      
  );
}

export default Releases;
