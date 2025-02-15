import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Pagination from "./table/Pagination";
import TableReleases from "./table/TableReleases";
import TableSearcher from "./table/TableSearcher";

const BoxReleases = ({ loading, setLoading, releasesPage, setReleasesPage }) => {
    const [searchTerm, setSearchTerm] = useState();

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
            <Box
                sx={{
                    textAlign: "left",
                    display: "flex",
                    ml: 0.3,
                    width: 200,
                    height: 33,
                }}
            >
                <Typography sx={{ mb: 2, ml: 0, fontFamily: "InterBold", fontSize: 22 }}>
                    Releases
                </Typography>
            </Box>

            <TableSearcher setReleasesPage={setReleasesPage} setLoading = {setLoading} 
                  setSearchTerm={setSearchTerm} />

            <TableReleases 
                releases={releasesPage?.content} 
                loading={loading}
            />

            <Pagination 
                setLoading={setLoading} 
                releasesPage={releasesPage} 
                searchTerm={searchTerm} 
                setReleasesPage={setReleasesPage} 
            />
        </Box>
    );
};

export default BoxReleases;
