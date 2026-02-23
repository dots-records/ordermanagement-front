import { useState } from "react";
import { IconButton, Box, Typography, Paper, Divider, CircularProgress, } from "@mui/material";
import { patchOrderWarning, patchOrderInformation } from "../../../../services/orderService";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const OrderInfo = ({ order, loading }) => {
    

    if (loading) {
        return (
            <Box className="box-container" sx={{ width: "250px" }}>
                <Typography 
                    sx={{ 
                        textAlign: "left", 
                        fontFamily: "InterBold", 
                        fontSize: 18 
                    }}
                >
                    Information
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
                    <CircularProgress size={33} />
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
        <Box className="box-container" sx={{width: "250px"}}>
            <Typography 
                sx={{ 
                    textAlign: "left", 
                    fontFamily: "InterBold", 
                    fontSize: 18 
                }}
            >
                Information
            </Typography>


            <Divider sx={{ my: 2, backgroundColor: "rgba(0,0,0,0.2)" }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography 
                    sx={{ 
                    fontFamily: "InterBold", 
                    fontSize: 12 
                    }}
                >
                    ID:
                </Typography>

                <Typography 
                    sx={{ 
                    fontFamily: "InterRegular", 
                    fontSize: 12 
                    }}
                >
                    {order.id}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, 
                    textAlign: "left", }}>
                <Typography 
                    sx={{ 
                    fontFamily: "InterBold", 
                    textAlign: "left",
                    fontSize: 12 
                    }}
                >
                    Platform:
                </Typography>

                <Typography 
                    sx={{ 
                    fontFamily: "InterRegular", 
                    fontSize: 12 
                    }}
                >
                    {order.platform}
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    textAlign: "left",
                    width: '100%',  
                    overflow: 'hidden' 
                }}
            >
                <Typography 
                    sx={{ 
                        fontFamily: "InterBold",
                        fontSize: 12 
                    }}
                >
                    Status:
                </Typography>

                <Typography 
                    sx={{ 
                        fontFamily: "InterRegular", 
                        fontSize: 12,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {order.status}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1,
                    textAlign: "left",  }}>
                <Typography 
                    sx={{ 
                    fontFamily: "InterBold", 
                    fontSize: 12 
                    }}
                >
                    Created:
                </Typography>

                <Typography 
                    sx={{ 
                    fontFamily: "InterRegular",
                    fontSize: 12 
                    }}
                >
                    {order.created}
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    textAlign: "left",
                    width: '100%',   
                    overflow: 'hidden',
                }}
            >
                <Typography 
                    sx={{ 
                        fontFamily: "InterBold",
                        fontSize: 12 
                    }}
                >
                    Link:
                </Typography>

                <Typography 
                    sx={{ 
                        fontFamily: "InterRegular", 
                        fontSize: 12,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <a 
                        href={order.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                    >
                        {order.uri}
                    </a>
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1,
                    textAlign: "left",  }}>
                <Typography 
                    sx={{ 
                    fontFamily: "InterBold", 
                    fontSize: 12 
                    }}
                >
                    Archived:
                </Typography>

                <Typography 
                    sx={{ 
                    fontFamily: "InterRegular",
                    fontSize: 12 
                    }}
                >
                    {order.archived ? "Yes" : "No"}
                </Typography>
            </Box>


            

            <Divider sx={{ my: 2, backgroundColor: "rgba(0,0,0,0.2)" }} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    px: hasWarning ? 2 : 0,
                    py: hasWarning ? 1 : 0,
                    borderRadius: 1,
                    backgroundColor: hasWarning ? "rgba(255, 207, 63, 0.08)" : "transparent",
                    borderLeft: hasWarning ? "3px solid rgba(255, 207, 63, 0.6)" : "3px solid transparent",
                    transition: "all 0.2s ease"
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontFamily: "InterBold",
                            fontSize: 12
                        }}
                    >
                        Warning
                    </Typography>

                    {!editingWarning ? (
                        <IconButton size="small" onClick={() => setEditingWarning(true)}>
                            <EditIcon sx={{fontSize: 15}} />
                        </IconButton>
                    ) : (
                        <Box>
                            <IconButton size="small" onClick={handleSaveWarning} disabled={savingWarning}>
                                {savingWarning ? <CircularProgress size={16} /> : <SaveIcon  sx={{fontSize: 15}}/>}
                            </IconButton>
                            <IconButton size="small" onClick={() => {
                                setEditingWarning(false);
                                setWarningValue(order.warning || "");
                            }}>
                                <CloseIcon  sx={{fontSize: 15}} />
                            </IconButton>
                            <IconButton size="small" onClick={handleDeleteWarning} disabled={savingWarning}>
                                <DeleteIcon sx={{fontSize: 15}} />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {!editingWarning ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            px: hasWarning ? 1 : 0,
                            py: hasWarning ? 1 : 0,
                            borderRadius: 1,
                            transition: "all 0.2s ease"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "InterRegular",
                                fontSize: 12,
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
                                fontSize: 12,
                                fontFamily: "InterRegular",
                            }
                        }}
                    />
                )}
            </Box>

            <Divider sx={{ my: 2, backgroundColor: "rgba(0,0,0,0.2)" }} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    px: hasInformation ? 2 : 0,
                    py: hasInformation ? 1 : 0,
                    borderRadius: 1,
                    backgroundColor: hasInformation ? "rgba(51, 173, 255, 0.06)" : "transparent",
                    borderLeft: hasInformation ? "3px solid rgba(51, 173, 255, 0.5)" : "3px solid transparent",
                    transition: "all 0.2s ease"
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontFamily: "InterBold",
                            fontSize: 12
                        }}
                    >
                        Relevant Info.
                    </Typography>

                    {!editingInformation ? (
                        <IconButton size="small" onClick={() => setEditingInformation(true)}>
                            <EditIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                    ) : (
                        <Box>
                            <IconButton size="small" onClick={handleSaveInformation} disabled={savingInformation}>
                                {savingInformation
                                    ? <CircularProgress size={16} />
                                    : <SaveIcon sx={{ fontSize: 15 }} />}
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={() => {
                                    setEditingInformation(false);
                                    setInformationValue(order.information || "");
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 15 }} />
                            </IconButton>

                            <IconButton size="small" onClick={handleDeleteInformation} disabled={savingInformation}>
                                <DeleteIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {!editingInformation ? (
                    <Typography
                        sx={{
                            fontFamily: "InterRegular",
                            fontSize: 12,
                            color: hasInformation ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.4)"
                        }}
                    >
                        {informationValue || "No information"}
                    </Typography>
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
                                fontSize: 12,
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
