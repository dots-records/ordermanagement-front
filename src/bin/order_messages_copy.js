import {
    Box,
    Typography,
    Paper,
  } from "@mui/material";
  
  const OrderMessages = ({ order,newMessagesCustomerLocation, newMessagesDiscogsLocation, newMessagesSellerLocation }) => {
    const TextDivider = ({ text }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1, height: 0.15, borderRadius: "8px", bgcolor: "rgba(211,47,47,255)" }} />
          <Typography sx={{ mx: 1, fontSize: 12.5, color: "rgba(211,47,47,255)", fontFamily: "InterSemiBold" }}>
            {text}
          </Typography>
          <Box sx={{ flexGrow: 1, height: 0.15, borderRadius: "8px", bgcolor: "rgba(211,47,47,255)" }} />
        </Box>
      );

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
  var myId = "4635827";
  return (
<Box className="dialog-container">
          <Typography sx={{ textAlign: "left", fontFamily: "InterBold", fontSize: 19 }}>Send Message</Typography>
          <Typography sx={{ textAlign: "left", fontFamily: "InterBold", fontSize: 16, mt: 2, ml: "8px" }}>Latest Messages</Typography>
          
          <Box className="dialog-last-messages" sx={{ display: "flex", flexDirection: "column-reverse", gap: 1, overflowY: "auto", '&::-webkit-scrollbar': { display: 'none' } }}>
            {sortedMessages.length > 0 ? (
              [...sortedMessages].reverse().map((message, index) => {
                if (message.type === "message") {
                  return (
                    <>
                      <Box key={index} sx={{ display: "flex", justifyContent: message.from.id === myId ? "flex-end" : "flex-start" }}>
                        <Paper sx={{ backgroundColor: message.from.id === myId ? "rgba(0,0,0,0.8)" : "grey.200", color: message.from.id === myId ? "white" : "black", borderRadius: "8px", maxWidth: 250, p: 1, whiteSpace: "normal", wordBreak: "break-word", textAlign: message.from.id === myId ? "right" : "left" }}>
                          <Typography sx={{ textAlign: "left", fontFamily: "InterRegular", fontSize: 12.5 }}>
                            {message.message}
                          </Typography>
                          <Typography sx={{ textAlign: message.from.id === myId ? "right" : "left", fontFamily: "InterRegular", fontSize: 10, color: message.from.id === myId ? "white" : "rgba(0, 0, 0, 0.6)", mt: 0.5 }}>
                            {formatTime(message.timestamp)}
                          </Typography>

                        </Paper>
                      </Box>
                      {
                      newMessagesCustomerLocation != 0 && (index === newMessagesCustomerLocation + newMessagesSellerLocation + newMessagesDiscogsLocation -1) && <TextDivider text="New Messages" />}
                    </>
                  );
                } else {
                  return (
                    <>
                    
                    <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography sx={{ textAlign: "center", fontFamily: "InterRegular", fontSize: 12, color: "rgba(0,0,0,0.6)", my: 0.5 }}>
                        {message.message}
                      </Typography>
                    </Box>
                    {newMessagesCustomerLocation != 0 && (index === newMessagesCustomerLocation + newMessagesSellerLocation + newMessagesDiscogsLocation -1) && <TextDivider text="New Messages" />}
                    </>
                  );
                }
              })
            ) : (
                <Box sx={{ 
                    border: '2px solid', 
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 1.5,
                    height: '100%',  
                    width: '100%',
                    alignItems: 'center',  
                    display: 'flex',  
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    mx: 'auto', // Center box horizontally
                  }}>
                    <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.45)', fontFamily: 'InterSemiBold' }}>
                      No messages available
                    </Typography>
                  </Box>
            )}
          </Box>
        </Box>
  );
}

export default OrderMessages;