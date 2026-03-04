import { useState } from "react";
import { IconButton, Box, Typography, Paper, Divider, CircularProgress, } from "@mui/material";
import { patchOrderWarning, patchOrderInformation } from "../../../../services/orderService";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const OrderInfo = ({ order, loading }) => {
    

    if (loading) {
        return (
            <Box className="box-container" sx={{ width: "30%", height: '85vh' }}>
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: "1.125rem" 
                    }}
                >
                    Order:
                </Typography>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        width: "100%", 
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',  
                    }}
                >
                    <CircularProgress size={'2rem'} />
                </Box>
            </Box>
        );
    }
    const [editingWarning, setEditingWarning] = useState(false);
    const [warningValue, setWarningValue] = useState(order.warning || "");
    const [savingWarning, setSavingWarning] = useState(false);
    const hasWarning = Boolean(warningValue && warningValue.trim() !== "");
    const [editingInformation, setEditingInformation] = useState(false);
    const [informationValue, setInformationValue] = useState(order.information || "");
    const [savingInformation, setSavingInformation] = useState(false);
    const hasInformation = Boolean(informationValue && informationValue.trim() !== "");

    const handleSaveWarning = async () => {
        try {
            setSavingWarning(true);
            await patchOrderWarning(order.id, warningValue);
            setEditingWarning(false);
        } catch (error) {
            console.error("Error updating warning:", error);
        } finally {
            setSavingWarning(false);
        }
    };

    const handleDeleteWarning = async () => {
        try {
            setSavingWarning(true);
            await patchOrderWarning(order.id, null);
            setWarningValue("");
            setEditingWarning(false);
        } catch (error) {
            console.error("Error deleting warning:", error);
        } finally {
            setSavingWarning(false);
        }
    };

    const handleSaveInformation = async () => {
        try {
            setSavingInformation(true);
            await patchOrderInformation(order.id, informationValue);
            setEditingInformation(false);
        } catch (error) {
            console.error("Error updating information:", error);
        } finally {
            setSavingInformation(false);
        }
    };

    const handleDeleteInformation = async () => {
        try {
            setSavingInformation(true);
            await patchOrderInformation(order.id, null);
            setInformationValue("");
            setEditingInformation(false);
        } catch (error) {
            console.error("Error deleting information:", error);
        } finally {
            setSavingInformation(false);
        }
    };

    return (
        <Box
            className="box-container"
            sx={{
                width: "30%",
                height: "85vh",
                overflowY: "auto",  
                overflowX: "hidden"  
            }}
        >
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
                    href={order.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
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
                            fontFamily: "InterBold", 
                            fontSize: "1.125rem",
                        }}
                    >
                        Order: {order.id}
                    </Typography>
                    <ArrowOutwardIcon sx={{ fontSize: "1.25rem" }} />
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
                        {order.archived ? "Archived" : "Not archived"}
                    </Box>
                </Box>

            </Box>
           


            <Divider sx={{ my: '0.5rem', backgroundColor: "rgba(0,0,0,0.2)" }} />

            <Box sx={{ display: 'flex', gap: '0.25rem', 
                    textAlign: "left", }}>
                <Typography 
                    sx={{ 
                    fontFamily: "InterBold", 
                    textAlign: "left",
                    fontSize: '0.75rem' 
                    }}
                >
                    Platform: 
                </Typography>

                <Typography 
                    sx={{ 
                    fontFamily: "InterRegular", 
                    fontSize: '0.75rem' 
                    }}
                >
                    {order.platform}
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: '0.25rem', 
                    textAlign: "left",
                    width: '100%',  
                    overflow: 'hidden' 
                }}
            >
                <Typography 
                    sx={{ 
                        fontFamily: "InterBold",
                        fontSize: '0.75rem'
                    }}
                >
                    Status:
                </Typography>

                <Typography 
                    sx={{ 
                        fontFamily: "InterRegular", 
                        fontSize: '0.75rem',
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {order.status}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: '0.25rem',
                    textAlign: "left",  }}>
                <Typography 
                    sx={{ 
                    fontFamily: "InterBold", 
                    fontSize: '0.75rem'
                    }}
                >
                    Created:
                </Typography>

                <Typography 
                    sx={{ 
                    fontFamily: "InterRegular",
                    fontSize: '0.75rem'
                    }}
                >
                    {order.created}
                </Typography>
            </Box>

            <Divider sx={{ my: '0.5rem', backgroundColor: "rgba(0,0,0,0.2)" }} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '0.25rem',
                    px: hasWarning ? '1rem' : 0,
                    py: hasWarning ? '0.5rem' : 0,
                    backgroundColor: hasWarning ? "rgba(255, 207, 63, 0.08)" : "transparent",
                    borderLeft: hasWarning ? "0.125rem solid rgba(255, 207, 63, 0.6)" : "0.125rem solid transparent",
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
                        Warning
                    </Typography>

                    {!editingWarning ? (
                        <IconButton size="small" onClick={() => setEditingWarning(true)}>
                            <EditIcon sx={{fontSize: '0.9375rem'}} />
                        </IconButton>
                    ) : (
                        <Box>
                            <IconButton size="small" onClick={handleSaveWarning} disabled={savingWarning}>
                                {savingWarning ? <CircularProgress size={'0.9375rem'} /> : <SaveIcon  sx={{fontSize: '0.9375rem'}}/>}
                            </IconButton>
                            <IconButton size="small" onClick={handleDeleteWarning} disabled={savingWarning}>
                                <DeleteIcon sx={{fontSize: '0.9375rem'}} />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {!editingWarning ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: '0.25rem',
                            px: hasWarning ?'0.5rem' : '0.5rem',
                            py: hasWarning ? '0.5rem' : '0.5rem',
                            transition: "all 0.2s ease",
                            border: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "InterRegular",
                                fontSize: '0.75rem',
                                color: hasWarning ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.4)"
                            }}
                        >
                            {warningValue || "No warning"}
                        </Typography>
                    </Box>
                ) : (
                    <TextField
                        value={warningValue}
                        onChange={(e) => setWarningValue(e.target.value)}
                        size="small"
                        multiline
                        minRows={2}
                        fullWidth
                        sx={{
                            "& .MuiInputBase-input": {
                                fontSize: "0.75rem",
                                fontFamily: "InterRegular",
                            }
                        }}
                    />
                )}
            </Box>

            <Divider sx={{ my: '0.5rem', backgroundColor: "rgba(0,0,0,0.2)" }} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '0.25rem',
                    px: hasInformation ? '1rem' : 0,
                    py: hasInformation ? '0.5rem' : 0,
                    backgroundColor: hasInformation ? "rgba(51, 173, 255, 0.06)" : "transparent",
                    borderLeft: hasInformation ? "0.125rem solid rgba(51, 173, 255, 0.5)" : "0.125rem solid transparent",
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
                        Relevant Info.
                    </Typography>

                    {!editingInformation ? (
                        <IconButton size="small" onClick={() => setEditingInformation(true)}>
                            <EditIcon sx={{ fontSize: '0.9375rem'}} />
                        </IconButton>
                    ) : (
                        <Box>
                            <IconButton size="small" onClick={handleSaveInformation} disabled={savingInformation}>
                                {savingInformation
                                    ? <CircularProgress size={'0.9375rem'} />
                                    : <SaveIcon sx={{ fontSize: '0.9375rem' }} />}
                            </IconButton>


                            <IconButton size="small" onClick={handleDeleteInformation} disabled={savingInformation}>
                                <DeleteIcon sx={{ fontSize: '0.9375rem' }} />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {!editingInformation ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: '0.25rem',
                            px: hasWarning ?'0.5rem' : '0.5rem',
                            py: hasWarning ? '0.5rem' : '0.5rem',
                            borderRadius: '0.25rem',
                            transition: "all 0.2s ease"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "InterRegular",
                                fontSize: '0.75rem',
                                color: hasInformation ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.4)"
                            }}
                        >
                            {informationValue || "No information"}
                        </Typography>
                    </Box>
                ) : (
                    <TextField
                        value={informationValue}
                        onChange={(e) => setInformationValue(e.target.value)}
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
    );
};

export default OrderInfo;
