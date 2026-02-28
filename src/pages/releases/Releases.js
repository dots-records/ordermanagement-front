
import {useState, useEffect} from 'react';
import DashboardLayout from '../../globalComponents/dashboard_layout/DashboardLayout';
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
        <DashboardLayout>
            <BoxReleases  
                loading={loading}
                setLoading={setLoading}
                releasesPage = {releasesPage}
                setReleasesPage = {setReleasesPage}
            />
        </DashboardLayout>
      
  );
}

export default Releases;
