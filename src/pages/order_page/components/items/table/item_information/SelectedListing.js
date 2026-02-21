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
import { useState, useEffect } from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { CircularProgress } from '@mui/material';

const SelectedListing = ({ listing }) => {

  if (!listing) {
          return (
          <Typography
              sx={{
              fontSize: 12,
              color: 'rgba(0,0,0,0.4)',
              px: 1,
              py: 1.4,
              }}
          >
              Info. Not Available
          </Typography>
          );
      }

          return (
            <ListItem
              key={listing.id}
              sx={{
                px: 4,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
                            
                <Box
                  sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: 8,
                    color: 'rgba(0, 0, 0, 0.6)' ,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border:  '1px solid rgba(0,0,0,0.2)',
                    textShadow: '0px 0px 4px rgba(0,0,0,0.10)',
                    borderRadius: 2,
                    textAlign: 'center',
                    py: 0.5,
                    px: 1.2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {listing.platform}
                </Box>

              

              
              <Box
                sx={{
                  ml: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexShrink: 0,
                  gap: 2,
                }}
              >
                <Typography
                    sx={{
                    textAlign: 'right',
                    fontSize: 10,
                    fontFamily: 'InterSemiBold',
                    color: 'rgba(0,0,0,0.85)',
                    flexShrink: 0,
                    }}
                >
                    {listing.sellingPrice} €
                </Typography>
                {listing.link && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔹 evita que el ListItem reciba el click
                      window.open(listing.link, '_blank');
                    }}
                    sx={{
                      color: 'rgba(0,0,0,0.45)' ,
                      '&:hover': {
                        color: 'rgba(0,0,0,0.85)' ,
                      },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                )}
                
              </Box>
              

              
            </ListItem>
          );
};

export default SelectedListing;
