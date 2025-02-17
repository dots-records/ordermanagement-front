import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Pagination from "./table/Pagination";
import TableReleases from "./table/TableReleases";
import TableSearcher from "./table/TableSearcher";
import TableAdd from "./table/TableAdd";
import TableSelector from "./table/TableSelector";

const BoxReleases = ({ loading, setLoading, releasesPage, setReleasesPage }) => {
    const [searchTerm, setSearchTerm] = useState();
    const [tableSelected, setTableSelected] = useState('Active Releases');
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
            setReleasesPage={setReleasesPage} tableSelected={tableSelected} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
 
            <TableSearcher setReleasesPage={setReleasesPage} setLoading = {setLoading} 
                  setSearchTerm={setSearchTerm} tableSelected={tableSelected} />

            <TableReleases 
                releases={releasesPage?.content} 
                loading={loading}
            />

            <TableAdd 
                setLoading={setLoading} 
                setReleasesPage={setReleasesPage} 
                tableSelected={tableSelected}
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
