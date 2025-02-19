import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Pagination from "./table/Pagination";
import TableReleases from "./table/TableReleases";
import TableSearcher from "./table/TableSearcher";
import TableAdd from "./table/TableAdd";
import TableSelector from "./table/TableSelector";
import TableReleaseSelection from "./table/TableReleaseSelection";

const BoxReleases = ({ loading, setLoading, releasesPage, setReleasesPage }) => {
    const [searchTerm, setSearchTerm] = useState();
    const [tableSelected, setTableSelected] = useState('Active Releases');
    const [releasesSelected, setReleasesSelected] = useState([]);
    return (
        <Box
            sx={{
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.10)",
                borderRadius: 2,
                p: 2,
                pb: 0,
                position: "relative"
            }}
        >
            <TableSelector setLoading={setLoading} setTableSelected={setTableSelected} 
            setReleasesPage={setReleasesPage} tableSelected={tableSelected} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            setReleasesSelected ={setReleasesSelected}/>
 
            <TableSearcher setReleasesPage={setReleasesPage} setLoading = {setLoading} 
                  setSearchTerm={setSearchTerm} tableSelected={tableSelected} />

            <TableReleases 
                releases={releasesPage?.content} 
                loading={loading}
                releasesSelected ={releasesSelected}
                setReleasesSelected ={setReleasesSelected}
            />

            <TableAdd 
                setLoading={setLoading} 
                setReleasesPage={setReleasesPage} 
                tableSelected={tableSelected}
                
                
            />

            <TableReleaseSelection 
                releasesSelected={releasesSelected} 
                setReleasesSelected={setReleasesSelected} 
                setReleasesPage={setReleasesPage}
                tableSelected={tableSelected}
                setLoading={setLoading}
                
            />

            <Pagination 
                setLoading={setLoading} 
                releasesPage={releasesPage} 
                searchTerm={searchTerm} 
                setReleasesPage={setReleasesPage} 
                tableSelected={tableSelected}
            />
        </Box>
    );
};

export default BoxReleases;
