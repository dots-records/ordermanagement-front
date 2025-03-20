import { useState } from "react";
import { IconButton, Box, Typography, Paper, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
        <Box className="box-container" sx={{width: "250px"}}>
            <Typography 
                sx={{ 
                    textAlign: "left", 
                    fontFamily: "InterBold", 
                    fontSize: 18 
                }}
            >
                {release?.title}
            </Typography>

            <Typography 
                sx={{ 
                    textAlign: "left", 
                    fontFamily: "InterSemiBold", 
                    fontSize: 13, 
                    color: "rgba(0,0,0,0.6)" 
                }}
            >
                {release.artists.map((artist) => artist.name).join(", ")}
            </Typography>

            {images.length > 0 && (
                <Box 
                    sx={{ 
                        mt: 2, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center" 
                    }}
                >
                    <Box 
                        sx={{ 
                            width: "100%", 
                            maxWidth: "220px", 
                            height: "220px", 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            borderRadius: 2, 
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
                                borderRadius: "3px",
                            }}
                        />
                    </Box>

                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            gap: 1, 
                            mt: 1 
                        }}
                    >
                        <IconButton 
                            onClick={prevImage} 
                            disabled={images.length <= 1}
                            sx={{ p: 0.5 }}
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
                            sx={{ p: 0.5 }}
                        >
                            <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            )}
            <Divider sx={{ my: 2, backgroundColor: "rgba(0,0,0,0.2)" }} />
            <Box >
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterRegular", 
                        fontSize: 14, 
                        color: "rgba(0,0,0,0.7)"  
                    }}
                >
                    {release.formats.map((format) => format.name).join(", ")}
                </Typography>

                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterRegular", 
                        fontSize: 12, 
                        color: "rgba(0,0,0,0.5)" 
                    }}
                >
                    {release.formats.map((format) => format.descriptions.join(", ")).join(" | ")}
                </Typography>
            </Box>
        </Box>
    );
};

export default ReleaseInfo;
