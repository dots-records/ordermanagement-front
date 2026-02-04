import {
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import { getListings } from '../../../../../../services/listingService';
import { useState, useEffect } from 'react';

const ListingTable = ({ releaseId, provider }) => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataListings = await getListings(releaseId, provider.id);
        setListings(dataListings);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Typography>Cargando...</Typography>;

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
    <List disablePadding>
      {listings.map((listing) => {
        const rawProfit = listing.sellingPrice - provider.price;
        const profit = rawProfit.toFixed(2);
        const isPositive = profit >= 0;
        const hasLink = Boolean(listing.link);

        return (
          <ListItem
            key={listing.id}
            onClick={
              hasLink ? () => window.open(listing.link, '_blank') : undefined
            }
            sx={{
              px: 10,
              py: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderBottom: '1px solid rgba(0,0,0,0.04)',
              cursor: hasLink ? 'pointer' : 'default',
              '&:hover': hasLink
                ? {
                    backgroundColor: 'rgba(0,0,0,0.025)',
                  }
                : undefined,
            }}
          >
            <Typography
              sx={{
                width: 80,
                fontSize: 12,
                fontFamily: 'InterRegular',
                color: 'rgba(0,0,0,0.6)',
                flexShrink: 0,
              }}
            >
              {listing.platform}
            </Typography>

            <Typography
              sx={{
                width: 70,
                textAlign: 'right',
                fontSize: 13,
                fontFamily: 'InterSemiBold',
                color: 'rgba(0,0,0,0.85)',
                flexShrink: 0,
              }}
            >
              {listing.sellingPrice} €
            </Typography>

            <Typography
              sx={{
                width: 70,
                textAlign: 'right',
                fontSize: 13,
                fontFamily: 'InterSemiBold',
                color: isPositive ? '#2e7d32' : '#c62828',
                flexShrink: 0,
              }}
            >
              {isPositive ? '+' : ''}
              {profit} €
            </Typography>

            <Box
              sx={{
                ml: 'auto',
                width: 40,
                display: 'flex',
                justifyContent: 'flex-end',
                flexShrink: 0,
              }}
            >
              {listing.link && (
                <IconButton
                  size="small"
                  onClick={() => window.open(listing.link, '_blank')}
                  sx={{
                    color: 'rgba(0,0,0,0.45)',
                    '&:hover': {
                      color: 'rgba(0,0,0,0.85)',
                    },
                  }}
                >
                  <OpenInNewIcon sx={{ fontSize: 17 }} />
                </IconButton>
              )}
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListingTable;
