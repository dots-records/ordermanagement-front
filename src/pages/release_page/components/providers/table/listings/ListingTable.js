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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListingEdit from './ListingEdit';
import { getListings, deleteListing } from '../../../../../../services/listingService';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const ListingTable = ({ releaseId, provider }) => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedListings, setSelectedListings] = useState([]);
  const [editOpen, setEditOpen] = useState(false);

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

  const handleEditSelected = () => {
    if (selectedListings.length > 0) {
      setEditOpen(true);
    }
  };

  const handleDeleteSelected = async () => {
    setLoading(true);
    if (selectedListings.length === 1) {
      await deleteListing(releaseId, provider.id, selectedListings[0]);
    } else if (selectedListings.length > 1) {
      await Promise.all(
              selectedListings.map((lid) =>
              deleteListing(releaseId, provider.id, lid)
            ));
    }
    await fetchListings();
    setLoading(false);
  };

  if (loading) return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 3,
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

  const allSelected = selectedListings.length === listings.length;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          backgroundColor: 'rgba(0,0,0,0.01)'
        }}
      >
        
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: "16px", 
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
            <DeleteIcon sx={{ fontSize: 17 }} />
          </IconButton>
          
          <Box
              sx={{
                width: '1px',
                height: 16,
                backgroundColor: 'rgba(0,0,0,0.15)',
                mx: 0.5,
              }}
            />
          <IconButton
            size="small"
            onClick={selectedListings.length > 0 ? handleEditSelected : undefined}
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
            <EditIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Box>
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

           <ListingEdit
          open={editOpen}
          onClose={async () => {
            setEditOpen(false);
            setSelectedListings([]); // opcional, deselecciona todos
            await fetchListings(); // 🔹 recargar listings
          }}
          selectedListings={listings.filter((l) =>
            selectedListings.includes(l.id)
          )}
          releaseId={releaseId}
          providerId={provider.id}
        />

      </Box>
      <Box
        sx={{
          height: '1px',
          backgroundColor: 'rgba(0,0,0,0.05)',
          
        }}
      />  
      <List disablePadding>
        {listings.map((listing) => {
          const rawProfit = listing.sellingPrice - provider.price;
          const profit = rawProfit.toFixed(2);
          const isPositive = profit >= 0;
          const isSelected = selectedListings.includes(listing.id);
          const daysAgo = getDaysAgo(listing.dateLastEdition);

          return (
            <ListItem
              key={listing.id}
              onClick={() => handleToggle(listing.id) }
              sx={{
                px: 4,
                py: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer' ,
                backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.05)' :'white' ,
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor:'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              
              <Box sx ={{ width: "170px"}}>                
                <Box
                  sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: 11,
                    color: 'rgba(0,0,0, 0.6 )',
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border: '1px solid rgba(0,0,0,0.2)',
                    textShadow: '0px 0px 4px rgba(0,0,0,0.10)',
                    borderRadius: 2,
                    textAlign: 'center',
                    py: 0.5,
                    px: 1.2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {listing.platform}
                </Box>
              </Box>

              <Typography
                sx={{
                  textAlign: 'right',
                  fontSize: 13,
                  width: 80,
                  fontFamily: 'InterSemiBold',
                  color: 'rgba(0,0,0,0.85)',
                  flexShrink: 0,
                }}
              >
                {listing.sellingPrice} €
              </Typography>

              <Typography
                sx={{
                  textAlign: 'left',
                  fontSize: 13,
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
                    fontSize: 11,
                    color: 'rgba(0,0,0,0.4)',
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
                        color: 'rgba(0,0,0,0.85)',
                      },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 17 }} />
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
    </>
  );
};

export default ListingTable;
