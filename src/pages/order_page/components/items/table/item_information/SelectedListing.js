import {  
  ListItem,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SelectedListing = ({ listing }) => {

  if (!listing) {
          return (
          <Box
                sx={{
                    textAlign: 'center',
                    py: '0.5rem'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        color: 'rgba(0,0,0,0.5)',
                    }}
                >
                    Listing Not Available
                </Typography>
            </Box>
          );
      }

          return (
            <ListItem
              key={listing.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '0.0625rem solid #ededed',
              }}
            >
                            
                <Box
                  sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: '0.6rem',
                    color: 'rgba(0, 0, 0, 0.6)' ,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border:  '1px solid rgba(0,0,0,0.2)',
                    textShadow: '0px 0px 4px rgba(0,0,0,0.10)',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    px: '0.6rem',
                    py: '0.2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transform: 'translateY(-0.0625rem)',
                    },
                  }}
                >
                  {listing.platform}
                </Box>

              <Typography
                    sx={{
                    fontSize: '0.65rem',
                    fontFamily: 'InterSemiBold',
                    color: 'rgba(0,0,0,0.85)',
                    }}
                >
                    {listing.sellingPrice} €
                </Typography>

              
              <Box
                sx={{
                  ml: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                
                {listing.link && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      window.open(listing.link, '_blank');
                    }}
                    sx={{
                      color: 'rgba(0,0,0,0.45)' ,
                      '&:hover': {
                        color: 'rgba(0,0,0,0.85)' ,
                      },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                )}
                
              </Box>
              

              
            </ListItem>
          );
};

export default SelectedListing;
