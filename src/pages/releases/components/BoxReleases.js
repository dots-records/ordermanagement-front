

import { Box } from "@mui/material"; 
import {useState, useEffect} from 'react';
import Pagination from "./table/Pagination";

const BoxReleases = ({ loading, setLoading, releasePage, setReleasePage}) => {
    const [searchTerm, setSearchTerm] = useState();
    return (
        <Box
            sx={{
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.10)',
            borderRadius: 2,
            p: 2,
            pb: 0,
            position: 'relative' // Agrega position relative al contenedor de la tabla
            }}
        >

            <Pagination setLoading = {setLoading} releasePage={releasePage} 
            searchTerm={searchTerm} setReleasePage={setReleasePage} />
            
                

            
        </Box>
    );
};

export default BoxReleases