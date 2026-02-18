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
import { CircularProgress } from '@mui/material';

const TableListingsAfterAssociation = ({ releaseId, provider}) => {
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

          return (
            <ListItem
              key={listing.id}
              sx={{
                px: 4,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              
              <Box sx ={{ width: "170px"}}>                
                <Box
                  sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: 10,
                    color: 'rgba(0, 0, 0, 0.6)' ,
                    backgroundColor: 'rgba(0,0,0,0.02)' ,
                    border: '1px solid rgba(0,0,0,0.2)' ,
                    textShadow: '0px 0px 4px rgba(0,0,0,0.10)',
                    borderRadius: 2,
                    textAlign: 'center',
                    py: 0.5,
                    px: 1.2,
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
                  fontSize: 12,
                  width: 80,
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
                  fontSize: 12,
                  width: 80,
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
                  width: 80,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
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
                      color: 'rgba(0,0,0,0.45)',
                      '&:hover': {
                        color:'rgba(0,0,0,0.85)' ,
                      },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
                
              </Box>
              

              
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default TableListingsAfterAssociation;
