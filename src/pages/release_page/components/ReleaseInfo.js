import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ReleaseInfo = ({ release, loading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    const images = release?.images || [];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box className="box-container">
            <Typography
                sx={{
                    textAlign: 'left',
                    fontFamily: 'InterBold',
                    fontSize: 19,
                }}
            >
                {release?.title}
            </Typography>

            {images.length > 0 && (
                <>
                    <img
                        src={images[currentIndex]?.resource_url}
                        alt={release?.title}
                        style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '3px',
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                        <Button 
                            variant="contained" 
                            onClick={prevImage} 
                            disabled={images.length <= 1}
                        >
                            Anterior
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={nextImage} 
                            disabled={images.length <= 1}
                        >
                            Siguiente
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ReleaseInfo;
