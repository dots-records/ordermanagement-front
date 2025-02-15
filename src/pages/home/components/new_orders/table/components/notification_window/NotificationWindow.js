import { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  Button,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  resetNewMessages,
  updateMessages,
  getUnarchivedNewOrders,
  getOrder
} from "../../../../../../../services/orderService";
import OrderMessages from "./components/messages/OrderMessages";

const TextDivider = ({ text }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box
      sx={{
        flexGrow: 1,
        height: 0.15,
        borderRadius: "8px",
        bgcolor: "rgba(211,47,47,255)",
      }}
    />
    <Typography
      sx={{
        mx: 1,
        fontSize: 12.5,
        color: "rgba(211,47,47,255)",
        fontFamily: "InterSemiBold",
      }}
    >
      {text}
    </Typography>
    <Box
      sx={{
        flexGrow: 1,
        height: 0.15,
        borderRadius: "8px",
        bgcolor: "rgba(211,47,47,255)",
      }}
    />
  </Box>
);

const NotificationWindow = ({ orderId, setNewOrders }) => {
  const [hoverNotify, setHoverNotify] = useState(false);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState()
  const [loading, setLoading] = useState(false);
  const color_icon_inactive = "rgba(0,0,0,0.35)";
  const color_icon_active = "rgba(0,0,0,1)";

  const handleClickOpen = async () => {
    setOpen(true);
    setLoading(true)
    await updateMessages(orderId)
    const data = await getOrder(orderId);
    setOrder(data);
    setLoading(false)
    resetNewMessages(orderId)
  };

  const handleClose = (event) => {
    setOpen(false);
    event.stopPropagation();
    onCloseAction();
  };

  const onCloseAction = async () => {
    const orders = await getUnarchivedNewOrders();
    setNewOrders(orders);
  };

  return (
    <>
      <Box
        component={Link}
        onClick={() => handleClickOpen()}
        onMouseEnter={() => setHoverNotify(true)}
        onMouseLeave={() => setHoverNotify(false)}
      >
        <NotificationsNoneIcon
          sx={{
            color: hoverNotify ? color_icon_active : color_icon_inactive,
            fontSize: 22.5,
          }}
        />
      </Box>
      <Dialog
        onClick={(event) => event.stopPropagation()}
        open={open}
        onClose={handleClose}
        onBackdropClick={handleClose}
      >
        <OrderMessages
          order={order}
          loading={loading}
        />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotificationWindow;
