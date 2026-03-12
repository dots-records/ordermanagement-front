import {
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  Button,
  Checkbox,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { getListings, deleteListing } from '../../../../../../../../services/listingService';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const TableListingsForDeletion = ({ item, setChanged}) => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedListings, setSelectedListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openErrorPopup, setOpenErrorPopup] = useState(false);

  const getDaysAgo = (dateString) => {
    if (!dateString) return null;

    const lastEdit = new Date(dateString);
    const now = new Date();

    const diffMs = now - lastEdit;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const dataListings = await getListings(item.release.id, item.provider.id);
      setListings(dataListings);
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        fetchListings();
   }, []);

   const handleToggle = (id) => {
    setSelectedListings((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (!listings) return;

    if (selectedListings.length === listings.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(listings.map((l) => l.id));
    }
  };

  const handleDeleteSelected = async () => {
      setLoading(true);
      try {
        if (selectedListings.length === 1) {
          await deleteListing(item.release.id, item.provider.id, selectedListings[0]);
        } else if (selectedListings.length > 1) {
          await Promise.all(
                  selectedListings.map((lid) =>
                  deleteListing(item.release.id, item.provider.id, lid)
                ));
        }
        setChanged(true);
      }  catch (error) {
        setErrorMessage(error.message);
        setOpenErrorPopup(true);
      } finally {
        fetchListings();
        setLoading(false);
      }
    };


  if (loading) return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: '1rem',
      }}
    >
      <CircularProgress size={'1rem'} sx={{color: 'rgba(0,0,0,0.4)'}} />
    </Box>
  );

  if (!listings || listings.length === 0) {
    return (
      <Box sx={{width: '100%', justifyItems: 'center'}}>
        <Typography
          sx={{
            fontSize: '0.675rem',
            color: 'rgba(0,0,0,0.4)',
            py: '0.5rem'
          }}
        >
          No Listings yet
        </Typography>
      </Box>
    );
  }

  const allSelected = selectedListings.length === listings.length;
  return (
    <>
        <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: '1rem',
              backgroundColor: 'rgba(0,0,0,0.01)'
            }}
          >
            
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', px: "1rem", 
             }}>
                <IconButton
                    size="small"
                    onClick={selectedListings.length > 0 ? handleDeleteSelected : undefined}
                    disabled={selectedListings.length === 0}
                    sx={{
                    color: 'rgba(0,0,0,0.35)',
                    '&:hover': {
                        color: selectedListings.length > 0
                        ? 'rgba(0,0,0,0.85)'
                        : 'rgba(0,0,0,0.35)',
                        backgroundColor: 'transparent',
                    },
                    }}
                >
                    <DeleteIcon sx={{ fontSize: '1.0625rem' }} />
                </IconButton>
              
              
                <Box
                onClick={handleSelectAll}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    
                }}
                >
                <Checkbox
                    size="small"
                    checked={allSelected}
                    indeterminate={
                    selectedListings.length > 0 &&
                    selectedListings.length < listings.length
                    }
                    sx={{
                    color: 'rgba(0,0,0,0.35)',
                    '&.Mui-checked': {
                        color: 'rgba(0,0,0,0.35)',
                    },
                    '&.MuiCheckbox-indeterminate': {
                        color: 'rgba(0,0,0,0.35)',
                    },
                    }}
                />
                </Box>
            </Box>
        </Box>
      <List disablePadding>
        {listings.map((listing) => {
          const rawProfit = listing.sellingPrice - item.provider.price;
          const profit = rawProfit.toFixed(2);
          const isPositive = profit >= 0;
          const isSelected = selectedListings.includes(listing.id);
          const daysAgo = getDaysAgo(listing.dateLastEdition);

          return (
            <ListItem
              key={listing.id}
              onClick={() => handleToggle(listing.id) }
              sx={{
                px: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '0.0625rem solid rgba(0,0,0,0.06)',
                cursor: 'pointer' ,
                backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.05)' :'transparent' ,
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor:'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              
              <Box sx ={{ width: "25%"}}>                
                <Box
                  sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: '0.625rem',
                    color: 'rgba(0, 0, 0, 0.6)' ,
                    backgroundColor: 'rgba(0,0,0,0.02)' ,
                    border: '1px solid rgba(0,0,0,0.2)' ,
                    textShadow: '0px 0px 4px rgba(0,0,0,0.10)',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    py: '0.25rem',
                    px: '0.6rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' ,
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)' ,
                      transform: 'translateY(-1px)' ,
                    },
                  }}
                >
                  {listing.platform}
                </Box>
              </Box>

              <Typography
                sx={{
                  textAlign: 'right',
                  fontSize: '0.75rem',
                  width: '15%',
                  fontFamily: 'InterSemiBold',
                  color: 'rgba(0,0,0,0.85)' ,
                  flexShrink: 0,
                }}
              >
                {listing.sellingPrice} €
              </Typography>

              <Typography
                sx={{
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  width: '20%',
                  fontFamily: 'InterSemiBold',
                  color:'rgba(0,0,0,0.5)',
                  flexShrink: 0,
                }}
              >
                {isPositive ? '+' : ''}
                {profit} €
              </Typography>
              <Box
                sx={{
                  width: '20%',
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    color: 'rgba(0,0,0,0.4)' ,
                    fontFamily: 'InterRegular',
                    
                  }}
                >
                  {daysAgo === null
                    ? ''
                    : daysAgo === 0
                    ? 'Today'
                    : daysAgo === 1
                    ? '1 day'
                    : `${daysAgo} days`}
                </Typography>
              </Box>

              <Box
                sx={{
                  ml: 'auto',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexShrink: 0,
                }}
              >
                {listing.link && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔹 evita que el ListItem reciba el click
                      window.open(listing.link, '_blank');
                    }}
                    sx={{
                      color: 'rgba(0,0,0,0.45)',
                      '&:hover': {
                        color:'rgba(0,0,0,0.85)' ,
                      },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                )}
                
              </Box>
              <Checkbox
                size="small"
                checked={isSelected}
                onChange={() => handleToggle(listing.id)}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  color: 'rgba(0,0,0,0.35)',
                  '&.Mui-checked': {
                    color: 'rgba(0,0,0,0.6)',
                  },
                }}
              />

              
            </ListItem>
          );
        })}
      </List>
      <Snackbar
        open={openErrorPopup}
        autoHideDuration={4000}
        onClose={() => setOpenErrorPopup(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => setOpenErrorPopup(false)}
          sx={{ width: '100%', fontFamily: 'InterRegular' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableListingsForDeletion;
