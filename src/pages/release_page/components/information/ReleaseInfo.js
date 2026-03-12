import { useState, useEffect } from "react";
import { IconButton, Box, Typography, Paper, Divider, CircularProgress, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { patchReleaseNote } from "../../../../services/releaseService";
import { Snackbar, Alert } from '@mui/material';

const ReleaseInfo = ({ release, loading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editingNote, setEditingNote] = useState(false);
    const [noteValue, setNoteValue] = useState("");
    const [savingNote, setSavingNote] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    useEffect(() => {
        setNoteValue(release?.note || "");
    }, [release]);
    const hasNote = Boolean(noteValue && noteValue.trim() !== "");

    const handleSaveNote = async () => {
        try {
            setSavingNote(true);
            await patchReleaseNote(release.id, noteValue);
            setEditingNote(false);
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
        } finally {
            setSavingNote(false);
        }
    };
    
    const handleDeleteNote = async () => {
        try {
            setSavingNote(true);
            await patchReleaseNote(release.id, null);
            setNoteValue("");
            setEditingNote(false);
        }  catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true); 
        } finally {
            setSavingNote(false);
        }
    };

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

    const images = release.images || [];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <Box className="box-container" sx={{width: '25%', height: '85vh', display: 'flex',
            flexDirection: 'column', gap: '1rem', overflowX: "hidden", overflowY: 'auto'}}>
                <Box
                    sx={{ 
                        textAlign: "left", 
                        display: "flex",        
                        flexDirection: "row", 
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="a"
                        href={release.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "inherit",
                            width: "fit-content",

                            "&:hover": {
                                textDecoration: "underline",
                            }
                        }}
                    >
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
                    <Box 
                        sx={{ 
                            fontFamily: "InterBold", 
                            fontSize: "1.125rem",
                            marginLeft: "auto"
                        }}
                    >
                        <Box 
                            sx={{ 
                                fontFamily: "InterSemiBold", 
                                fontSize: "0.6rem",
                                color: 'rgba(0,0,0,0.5)',
                                backgroundColor: 'rgba(0,0,0,0.03)',
                                borderRadius: '0.25rem',
                                marginLeft: "auto",
                                px: '0.5rem',
                                py: '0.25rem',
                            }}
                        >
                            {release.archived ? "Archived" : "Not archived"}
                        </Box>
                    </Box>
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
                <Box sx={{display:'flex', flexDirection: 'column'}}>
                    <Typography 
                        sx={{ 
                            textAlign: "left", 
                            fontFamily: "InterRegular", 
                            fontSize: '0.875rem', 
                            color: "rgba(0,0,0,0.7)"  
                        }}
                    >
                        {release.formats.map((format) => format.name).join(", ")}
                        {", "}
                        { release.formats.map((format) => format.text).join(", ")}
                        
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

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: '0.25rem',
                        px: hasNote ? '1rem' : 0,
                        py: hasNote ? '0.5rem' : 0,
                        backgroundColor: hasNote ? "rgba(51, 173, 255, 0.06)" : "transparent",
                        borderLeft: hasNote ? "0.125rem solid rgba(51, 173, 255, 0.5)" : "0.125rem solid transparent",
                        transition: "all 0.2s ease"
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography
                            sx={{
                                fontFamily: "InterBold",
                                fontSize: '0.75rem'
                            }}
                        >
                            Note
                        </Typography>
                        
                        {!editingNote ? (
                            <IconButton size="small" onClick={() => setEditingNote(true)}>
                                <EditIcon sx={{ fontSize: '0.9375rem'}} />
                            </IconButton>
                        ) : (
                            <Box>
                                <IconButton size="small" onClick={handleSaveNote} disabled={savingNote}>
                                    {savingNote
                                        ? <CircularProgress size={'0.9375rem'} />
                                        : <SaveIcon sx={{ fontSize: '0.9375rem' }} />}
                                </IconButton>
                                <IconButton size="small" onClick={handleDeleteNote} disabled={savingNote}>
                                    <DeleteIcon sx={{ fontSize: '0.9375rem' }} />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                    
                    {!editingNote ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: '0.25rem',
                                px:  '0.5rem',
                                py:'0.5rem',
                                borderRadius: '0.25rem',
                                transition: "all 0.2s ease"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "InterRegular",
                                    fontSize: '0.75rem',
                                    color: hasNote ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.4)",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere"
                                }}
                            >
                                { noteValue || "No information"}
                            </Typography>
                        </Box>
                    ) : (
                        <TextField
                            value={noteValue}
                            onChange={(e) => setNoteValue(e.target.value)}
                            size="small"
                            multiline
                            minRows={2}
                            fullWidth
                            sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: '0.75rem',
                                    fontFamily: "InterRegular",
                                }
                            }}
                        />
                    )}
                </Box>      
            </Box>
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

export default ReleaseInfo;
