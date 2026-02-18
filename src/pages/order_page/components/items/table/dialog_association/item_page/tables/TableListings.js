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
import { getListings} from '../../../../../../../../services/listingService';
import { useState, useEffect } from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { CircularProgress } from '@mui/material';

const TableListings = ({ releaseId, provider, order, setListingAssociated, listingAssociated }) => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const dataListings = await getListings(releaseId, provider.id);
      setListings(dataListings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        if (!provider?.id || !releaseId) return;

        fetchListings();
   }, [provider?.id, releaseId]);

  if (loading) return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <CircularProgress size={24} sx={{ color: 'rgba(0,0,0,0.4)' }} />
    </Box>
  );

  if (!listings || listings.length === 0) {
    return (
      <Typography
        sx={{
          fontSize: 12,
          color: 'rgba(0,0,0,0.4)',
          px: 1,
          py: 1.4,
        }}
      >
        No listings yet
      </Typography>
    );
  }
  return (
    <>
      <List disablePadding>
        {listings.map((listing) => {
          const rawProfit = listing.sellingPrice - provider?.price;
          const profit = rawProfit.toFixed(2);
          const isPositive = profit >= 0;
          const daysAgo = getDaysAgo(listing.dateLastEdition);
          const validListing = order.platform === listing.platform;
          const isSelected = listingAssociated != null && (listingAssociated.id === listing.id);

          return (
            <ListItem
              key={listing.id}
              onClick={() => {
                    if (!validListing) return; // seguridad extra
                    setListingAssociated(listing); // guardar el listing seleccionado en el padre
                    }}
              sx={{
                px: 4,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                cursor: validListing ?  'pointer': "cursor" ,
                '&:hover': {
                  backgroundColor: validListing ? 'rgba(0, 0, 0, 0.05)' : "transparent",
                },
              }}
            >
              
              <Box sx ={{ width: "170px"}}>                
                <Box
                  sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: 10,
                    color: validListing ? 'rgba(0, 0, 0, 0.6)' : "rgba(0, 0, 0, 0.3)",
                    backgroundColor: validListing ? 'rgba(0,0,0,0.02)' : "rgba(0, 0, 0, 0.01)",
                    border: validListing ?  '1px solid rgba(0,0,0,0.2)' : '1px solid rgba(0,0,0,0.1)',
                    textShadow: validListing ? '0px 0px 4px rgba(0,0,0,0.10)' : "none",
                    borderRadius: 2,
                    textAlign: 'center',
                    py: 0.5,
                    px: 1.2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: validListing ? '0 1px 3px rgba(0,0,0,0.1)' : "none",
                    '&:hover': {
                      boxShadow: validListing ?  '0 2px 6px rgba(0,0,0,0.15)' : "none",
                      transform: validListing ? 'translateY(-1px)' : "none",
                    },
                  }}
                >
                  {listing.platform}
                </Box>
              </Box>

              <Typography
                sx={{
                  textAlign: 'right',
                  fontSize: 12,
                  width: 80,
                  fontFamily: 'InterSemiBold',
                  color: validListing ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.3)',
                  flexShrink: 0,
                }}
              >
                {listing.sellingPrice} €
              </Typography>

              <Typography
                sx={{
                  textAlign: 'left',
                  fontSize: 12,
                  width: 80,
                  fontFamily: 'InterSemiBold',
                  color: validListing ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)',
                  flexShrink: 0,
                }}
              >
                {isPositive ? '+' : ''}
                {profit} €
              </Typography>
              <Box
                sx={{
                  width: 80,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    color: validListing ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.3)',
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
                  width: 30,
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
                      color: validListing ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.3)',
                      '&:hover': {
                        color: validListing ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.60)',
                      },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
                
              </Box>
              <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton
                    size="small"
                    disabled={!validListing} // 🔹 deshabilitado si no es válido
                    onClick={() => {
                    if (!validListing) return; // seguridad extra
                    setListingAssociated(listing); // guardar el listing seleccionado en el padre
                    }}
                    sx={{ 
                    
                    }}
                >
                    {isSelected ? (
                    <RadioButtonCheckedIcon sx={{
                        fontSize: 16,
                        color: validListing ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.3)',
                        '&:hover': {
                            color: 'rgba(0,0,0,0.85)' ,
                        },
                        
                        }} 
                    />
                    ) : (
                    <RadioButtonUncheckedIcon sx={{
                        fontSize: 16,
                        color: validListing ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.3)',
                        '&:hover': {
                            color: 'rgba(0,0,0,0.85)' ,
                        },
                        
                        }} 
                    />
                    )}
                </IconButton>
                </Box>

              
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default TableListings;
