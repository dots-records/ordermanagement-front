import React, { useState } from 'react';
import { Typography, Box, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { getSelectedTableReleases } from '../../functions/Functions';

const TableSelector = ({ setLoading, setTableSelected, tableSelected, setReleasesPage, searchTerm, setSearchTerm}) => {
    const [anchorSel, setAnchorSel] = useState(null);
  
    const handleClickSel = (event) => {
      setAnchorSel(event.currentTarget); // Establece el elemento que dispara el menú
    };
  
    const handleCloseSel = async (selection) => {
      setTableSelected(selection);
      setSearchTerm()
      setAnchorSel(null); // Cierra el menú
      setLoading(true);
      const response = await getSelectedTableReleases(selection, 0, "");
      setReleasesPage(response)
      setLoading(false);
    };
  
    return (
      <>
        <Box
          aria-controls={anchorSel ? 'table-selector-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClickSel}
          sx={{ textAlign: 'left', display: 'flex', ml: 0.3, width: 220, height: 33, cursor: 'pointer' }}
        >
          <Typography sx={{ mb: 2, ml: 0, fontFamily: 'InterBold', fontSize: 22 }}>
            {tableSelected}
          </Typography>
          <ArrowDropDown sx={{ mt: 0.55, ml: 0.2, fontFamily: 'InterBold', fontSize: 25 }} />
        </Box>
  
        <Menu
          id="table-selector-menu"
          anchorEl={anchorSel} // Ancla el menú al elemento que disparó el evento
          open={Boolean(anchorSel)}
          onClose={() => setAnchorSel(null)}
          PaperProps={{
            sx: {
              width: 255,
              '& .MuiMenuItem-root': {
                fontSize: 12,
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
  