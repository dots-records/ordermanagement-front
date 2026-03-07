import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Pagination from "./table/Pagination";
import TableReleases from "./table/TableReleases";
import TableSearcher from "./table/TableSearcher";
import TableAdd from "./table/TableAdd";
import TableSelector from "./table/TableSelector";
import TableCount from "./table/TableCount";
import TableReleaseSelection from "./table/TableReleaseSelection";

const BoxReleases = ({ loading, setLoading, releasesPage, setReleasesPage, count, setCount }) => {
    const [searchTerm, setSearchTerm] = useState();
    const [tableSelected, setTableSelected] = useState('Active Releases');
    const [releasesSelected, setReleasesSelected] = useState([]);
    return (
        <Box
            className="box-container"
            sx={{
                display: 'flex',
                position: 'relative', 
                flexDirection: 'column',
                height: '100%',
                alignItems: 'flex-start',
                gap: '0.5rem',
                p: '1rem 1rem 0.5rem 1rem'
            }}
        >
            <Box sx={{
                display: 'flex',
                width:'100%',
                flexDirection: 'row',
                alignItems: 'flex-start',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.5rem',
                    alignItems: 'center',
                }}>
                    <TableSelector setLoading={setLoading} setTableSelected={setTableSelected} 
                    setReleasesPage={setReleasesPage} tableSelected={tableSelected} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    setReleasesSelected ={setReleasesSelected} setCount={setCount}/>
                    <TableCount count={count}/>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, gap: '0.5rem' }}>
                    <TableReleaseSelection 
                        releasesSelected={releasesSelected} 
                        setReleasesSelected={setReleasesSelected} 
                        setReleasesPage={setReleasesPage}
                        tableSelected={tableSelected}
                        setLoading={setLoading}
                        setCount={setCount}
                    />
                    <TableAdd 
                        setLoading={setLoading} 
                        setReleasesPage={setReleasesPage} 
                        tableSelected={tableSelected}
                        setCount={setCount}
                    />

                    <TableSearcher setReleasesPage={setReleasesPage} setLoading = {setLoading} 
                    setSearchTerm={setSearchTerm} tableSelected={tableSelected} />
                    
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                width:'100%',
                borderBottom: '0.08rem solid rgba(0,0,0,0.15)',
            }}>
                <TableReleases 
                    releases={releasesPage?.content} 
                    loading={loading}
                    releasesSelected ={releasesSelected}
                    setReleasesSelected ={setReleasesSelected}
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
