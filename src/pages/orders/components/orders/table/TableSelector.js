import React, { useState } from 'react';
import { Typography, Box, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { getSelectedTableOrders } from '../../../functions/Functions';

const TableSelector = ({ setLoading, setTableSelected, tableSelected, setOrdersPage, searchTerm, setSearchTerm}) => {
  const [anchorSel, setAnchorSel] = useState(null);

  const handleClickSel = (event) => {
    setAnchorSel(event.currentTarget); // Establece el elemento que dispara el menú
  };

  const handleCloseSel = async (selection) => {
    setTableSelected(selection);
    setSearchTerm()
    setAnchorSel(null); // Cierra el menú
    setLoading(true);
    const response = await getSelectedTableOrders(selection, 0, "");
    setOrdersPage(response)
    setLoading(false);
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
        <Typography sx={{ fontFamily: 'InterBold', fontSize: '1.375rem'}}>
          {tableSelected}
        </Typography>
        <ArrowDropDown sx={{ fontFamily: 'InterBold', fontSize: '1.5625rem'}} />
      </Box>

      <Menu
        id="table-selector-menu"
        anchorEl={anchorSel} // Ancla el menú al elemento que disparó el evento
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
        <MenuItem onClick={() => handleCloseSel('Active Orders')}>Active Orders</MenuItem>
        <MenuItem onClick={() => handleCloseSel('Inactive Orders')}>Inactive Orders</MenuItem>
        <MenuItem onClick={() => handleCloseSel('All Orders')}>All Orders</MenuItem>
      </Menu>
    </>
  );
};

export default TableSelector;
