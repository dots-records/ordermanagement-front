import React, { useState } from 'react';
import { Typography, Box, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { getSelectedTableReleases } from '../../functions/Functions';
import { getReleasesCount } from '../../../../services/releaseService';

const TableSelector = ({ setLoading, setTableSelected, tableSelected, setReleasesPage, searchTerm, setSearchTerm, setReleasesSelected, setCount}) => {
    const [anchorSel, setAnchorSel] = useState(null);
    
  
    const handleClickSel = (event) => {
      setAnchorSel(event.currentTarget); // Establece el elemento que dispara el menú
    };
  
    const handleCloseSel = async (selection) => {
      setTableSelected(selection);
      setSearchTerm()
      setReleasesSelected([]);
      setAnchorSel(null); // Cierra el menú
      setLoading(true);
      const response = await getSelectedTableReleases(selection, 0, "");
      setReleasesPage(response)
      setCount(null)
      setLoading(false);

      let archivedParam = null;
      if (selection === 'Active Releases') archivedParam = false;
      else if (selection === 'Inactive Releases') archivedParam = true;
      else archivedParam = null; // All Releases
      const count = await getReleasesCount(archivedParam);
      setCount(count);
    };
  
    return (
      <>
        <Box
          aria-controls={anchorSel ? 'table-selector-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClickSel}
          sx={{ 
            textAlign: 'left', 
            display: 'flex', 
            cursor: 'pointer', 
            alignItems: 'center',
          }}
        >
          <Typography sx={{  fontFamily: 'InterBold', fontSize: '1.375rem' }}>
            {tableSelected}
          </Typography>
          <ArrowDropDown sx={{fontFamily: 'InterBold', fontSize: '1.5625rem' }} />
        </Box>
  
        <Menu
          id="table-selector-menu"
          anchorEl={anchorSel} 
          open={Boolean(anchorSel)}
          onClose={() => setAnchorSel(null)}
          PaperProps={{
            sx: {
              width: '15.9375rem',
              '& .MuiMenuItem-root': {
                fontSize: '0.75rem',
                fontFamily: 'InterSemiBold',
              },
            },
          }}
        >
          <MenuItem onClick={() => handleCloseSel('Active Releases')}>Active Releases</MenuItem>
          <MenuItem onClick={() => handleCloseSel('Inactive Releases')}>Inactive Releases</MenuItem>
          <MenuItem onClick={() => handleCloseSel('All Releases')}>All Releases</MenuItem>
        </Menu>
      </>
    );
  };
  
  export default TableSelector;
  