import { useState } from "react";
import { IconButton, Box, Typography, Paper, Divider, CircularProgress} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ReleaseInfo = ({ release, loading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (loading) {
        return (
            <Box className="box-container" sx={{ width: '25%', height: '85vh',  }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        width: "100%", 
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',  
                    }}
                >
                    <CircularProgress size={'1.5rem'} />
                </Box>
            </Box>
        );
    }

    const images = release?.images || [];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box className="box-container" sx={{width: '25%', height: '85vh', display: 'flex',
        flexDirection: 'column', gap: '1rem', overflowX: "hidden", overflowY: 'auto'}}>
            <Box >
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: "1.125rem",
                    }}
                >
                    {release?.title}
                </Typography>

                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterSemiBold", 
                        fontSize: '0.8125rem', 
                        color: "rgba(0,0,0,0.6)" 
                    }}
                >
                    {release.artists.map((artist) => artist.name).join(", ")}
                </Typography>
            </Box>

            {images.length > 0 && (
                <Box 
                    sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        gap: '0.5rem'
                    }}
                >
                    <Box 
                        sx={{ 
                            width: "100%", 
                            maxWidth: "13.75rem", 
                            height: "13.75rem", 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            borderRadius: '0.5rem', 
                            overflow: "hidden",
                            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
                        }}
                    >
                        <img
                            src={images[currentIndex]?.resource_url}
                            alt={release?.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            gap: '0.5rem'
                        }}
                    >
                        <IconButton 
                            onClick={prevImage} 
                            disabled={images.length <= 1}
                            sx={{ p:0}}
                          
                        >
                            <ArrowBackIcon fontSize="small" />
                        </IconButton>

                        <Typography 
                            fontSize="small" 
                            sx={{ 
                                fontFamily: "InterRegular", 
                                color: "rgba(0, 0, 0, 0.7)" 
                            }}
                        >
                            {`${currentIndex + 1} de ${images.length}`}
                        </Typography>

                        <IconButton 
                            onClick={nextImage} 
                            disabled={images.length <= 1}
                            sx={{ p:0}}
                        >
                            <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            )}
            <Divider sx={{ backgroundColor: "rgba(0,0,0,0.2)" }} />
            <Box >
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterRegular", 
                        fontSize: '0.875rem', 
                        color: "rgba(0,0,0,0.7)"  
                    }}
                >
                    {release.formats.map((format) => format.name).join(", ")}
                </Typography>

                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterRegular", 
                        fontSize: '0.75rem', 
                        color: "rgba(0,0,0,0.5)" 
                    }}
                >
                    {release.formats.map((format) => format.descriptions.join(", ")).join(" | ")}
                   </Typography>
            </Box>

            <Divider sx={{ backgroundColor: "rgba(0,0,0,0.2)" }} />
        </Box>
    );
};

export default ReleaseInfo;
