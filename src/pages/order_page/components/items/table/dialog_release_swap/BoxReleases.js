import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Pagination from "./table_releases/Pagination";
import TableReleases from "./table_releases/TableReleases";
import TableSearcher from "./table_releases/TableSearcher";

const BoxReleases = ({ loading, setLoading, releasesPage, setReleasesPage, setReleaseId, releaseId}) => {
    const [searchTerm, setSearchTerm] = useState();
    const [tableSelected, setTableSelected] = useState('Active Releases');
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'relative', 
                flexDirection: 'column',
                height: '100%',
                alignItems: 'flex-start',
                gap: '0.5rem'
            }}
        >
            <Box sx={{
                display: 'flex',
                width:'100%',
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, gap: '0.5rem' }}>
                   

                    <TableSearcher setReleasesPage={setReleasesPage} setLoading = {setLoading} 
                    setSearchTerm={setSearchTerm} tableSelected={tableSelected} />
                    
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                width:'100%'
            }}>
                <TableReleases 
                    releases={releasesPage?.content} 
                    loading={loading}
                    setReleaseId={setReleaseId}
                    releaseId={releaseId}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                width:'100%',
                justifyContent: 'center'
            }}>
                <Pagination 
                    setLoading={setLoading} 
                    releasesPage={releasesPage} 
                    searchTerm={searchTerm} 
                    setReleasesPage={setReleasesPage} 
                    tableSelected={tableSelected}
                />
            </Box>
        </Box>
    );
};

export default BoxReleases;
