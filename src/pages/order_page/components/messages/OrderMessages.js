import React, { useState } from "react";
import { Box, Typography, Paper, CircularProgress, TextField, Button } from "@mui/material";
import MessagesEmptyContainer from "./MessagesEmptyContainer";
import { sendMessage, updateMessages, getOrder } from "../../../../services/orderService";
import SendIcon from '@mui/icons-material/Send';

const OrderMessages = ({ order, loading, setOrder, setLoading }) => {
  const [messageInput, setMessageInput] = useState(""); // Estado para el input del mensaje
  var messageInputBackup;
  var myId = "4635827";

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const messages = order?.messageManager?.messages || [];
  const sortedMessages = messages.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateA - dateB;
  });

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return; // No enviar si el mensaje está vacío
    setLoading(true);
    messageInputBackup = messageInput;
    setMessageInput("");
    await sendMessage(order.id, messageInputBackup); // Llamada a la función de sendMessage
    await updateMessages(order.id);
    const data = await getOrder(order.id);
    setOrder(data);
    setLoading(false); // Limpiar el input
  };

  return (
    <Box className="dialog-container">
      <Typography sx={{ textAlign: "left", fontFamily: "InterBold", fontSize: 16, mt: 2, ml: "8px" }}>
        Messages
      </Typography>

      <Box
        className="dialog-last-messages"
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          position: "relative", // Asegura que el círculo de carga se posicione correctamente
          border: "1px solid rgba(0, 0, 0, 0.10)", // Color del borde con opacidad
          borderRadius: "8px 8px 0 0", // Bordes redondeados
          padding: "16px", // Padding interno
          height: "60px", // Altura del contenedor
          width: "400px", // Ancho del contenedor
          marginTop: "8px", // Margen superior
          marginLeft: "8px", // Margen izquierdo
        }}
      ></Box>

      <Box
        className="dialog-last-messages"
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          position: "relative", // Asegura que el círculo de carga se posicione correctamente
          border: "1px solid rgba(0, 0, 0, 0.10)", // Color del borde con opacidad
          borderRadius: "0 0 0 0", // Bordes redondeados
          padding: "16px", // Padding interno
          height: "280px", // Altura del contenedor
          width: "400px", // Ancho del contenedor
          marginTop: "2px", // Margen superior
          marginLeft: "8px", // Margen izquierdo
        }}
      >
        {loading ? (
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <CircularProgress size={33} />
          </Box>
        ) : sortedMessages.length > 0 ? (
          [...sortedMessages].reverse().map((message, index) => {
            if (message.type === "message") {
              return (
                <Box key={index} sx={{ display: "flex", justifyContent: message.from.id === myId ? "flex-end" : "flex-start" }}>
                  <Paper
                    sx={{
                      backgroundColor: message.from.id === myId ? "rgba(0,0,0,0.8)" : "grey.200",
                      color: message.from.id === myId ? "white" : "black",
                      borderRadius: "8px",
                      maxWidth: 250,
                      p: 1,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      textAlign: message.from.id === myId ? "right" : "left",
                    }}
                  >
                    <Typography sx={{ textAlign: "left", fontFamily: "InterRegular", fontSize: 12.5 }}>
                      {message.message}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: message.from.id === myId ? "right" : "left",
                        fontFamily: "InterRegular",
                        fontSize: 10,
                        color: message.from.id === myId ? "white" : "rgba(0, 0, 0, 0.6)",
                        mt: 0.5,
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Paper>
                </Box>
              );
            } else {
              return (
                <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ textAlign: "center", fontFamily: "InterRegular", fontSize: 12, color: "rgba(0,0,0,0.6)", my: 0.5 }}>
                    {message.message}
                  </Typography>
                </Box>
              );
            }
          })
        ) : (
          <MessagesEmptyContainer />
        )}
      </Box>

      {/* Input para enviar mensaje */}
      <Box sx={{ display: "flex", alignItems: "center", mt: "2px" }}>
        <TextField
          multiline
          rows={2}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message here..."
          sx={{
            width: "350px",
            marginLeft: "8px",
            "& .MuiOutlinedInput-root": {
              fontFamily: "InterRegular", // Aplica la fuente al contenedor
              fontSize: 14,
              padding: "10px",
              "& input, & textarea": {
                fontFamily: "InterRegular", // Aplica la fuente al contenido del campo
              },
              "& fieldset": {
                border: "1px solid rgba(0, 0, 0, 0.1)", // Personaliza el borde
                borderRadius: "0 0 0 8px", // Redondea las esquinas
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 0, 0, 0.2)", // Cambia el borde al pasar el mouse (opcional)
              },
              "&.Mui-focused fieldset": {
                border: "1px solid rgba(0, 0, 0, 0.4)", // Cambia el borde cuando está enfocado (opcional)
              },
            },
          }}
        />

        <Button
          onClick={handleSendMessage}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            ml: "2px",
            borderRadius: "0 0 8px 0",
            padding: "0", // Elimina el padding interno del botón
            minWidth: "unset", // Evita el ancho mínimo predeterminado
            width: "48px", // Ancho fijo
            height: "60px", // Altura fija para un botón cuadrado
            color: "white",
            display: "flex", // Asegura la alineación del contenido
            justifyContent: "center",
            alignItems: "center",
            "& .MuiSvgIcon-root": {
              fontSize: "20px", // Ajusta el tamaño del ícono (opcional)
            },
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default OrderMessages;
