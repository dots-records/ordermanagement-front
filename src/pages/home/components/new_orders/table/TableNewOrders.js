import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import PaymentReceivedBar from './components/status_bar/PaymentReceivedBar';
import InvoiceSentBar from './components/status_bar/InvoiceSentBar';
import PaymentPendingBar from './components/status_bar/PaymentPendingBar';
import EmptyContainer from './components/EmptyContainer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import NotificationWindow from './components/notification_window/NotificationWindow';
import CircleIcon from '@mui/icons-material/Circle';
import Badge from '@mui/material/Badge';
import { ConstructionOutlined } from '@mui/icons-material';
import { resetNewMessages,updateMessages } from '../../../../../services/orderService'

const width = 700;
const height = 300;
const color_icon_inactive = 'rgba(0,0,0,0.35)';
const color_icon_active = 'rgba(0,0,0,1)';
const color_table_head_text = 'rgba(0,0,0,0.65)';

const TableNewOrders = ({ newOrders, loading, setNewOrders }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={33} />
      </Box>
    );
  }

  const getNotifications = (notified, order) => {
    if (!notified) {
      return /*<NotificationWindow orderId={order.id} setNewOrders={setNewOrders} />*/;
    } else {
      return <NotificationsIcon sx={{ color: color_icon_active }} />;
    }
  };

  const newMessagesPoint = (numberMessages) => {
    if (numberMessages >= 1) {
      return <CircleIcon sx={{ fontSize: '12px', color: 'rgba(211,47,47,255)' }} />;
    }
  };


  const getBoxColor = (status) => {
    switch (status) {
      case 'Payment Received':
        return 'rgba(253, 214, 103,';
      case 'Invoice Sent':
        return 'rgba(255, 173, 201,';
      case 'Payment Pending':
        return 'rgba(255, 173, 201,';
      default:
        return 'rgba(0, 0, 0,';
    }
  };

  const getBar = (status, orderId) => {
    switch (status) {
      case 'Payment Received':
        return (
          <PaymentReceivedBar orderId={orderId} setNewOrders = {setNewOrders}   />
        );
      case 'Invoice Sent':
        return <InvoiceSentBar />;
      case 'Payment Pending':
        return <PaymentPendingBar />;
      default:
        return (
          <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12 }}>
            Not defined
          </Typography>
        );
    }
  };

  const handleTableRowClick = async (order) => {
    await updateMessages(order.id)
    await resetNewMessages(order.id)
  };

  return (
    <TableContainer
      sx={{
        width: width,
        height: height,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: 'InterSemiBold', color: color_table_head_text }}>
              Nº
            </TableCell>
            <TableCell
              sx={{
                fontFamily: 'InterSemiBold',
                color: color_table_head_text,
                width: '300px',
              }}
            >
              Name
            </TableCell>
            <TableCell sx={{ fontFamily: 'InterSemiBold', color: color_table_head_text }}>
              Status
            </TableCell>
            <TableCell
              sx={{
                fontFamily: 'InterSemiBold',
                color: color_table_head_text,
                width: '130px',
              }}
            >
              Created
            </TableCell>
            <TableCell sx={{ fontFamily: 'InterSemiBold', color: color_table_head_text }}>
              Not.
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {newOrders.length === 0 ? (
            <TableRow>
              <EmptyContainer />
            </TableRow>
          ) : (
            newOrders.map((order, index) => (
              <TableRow
                key={order.id}
                component={Link}
                to={`/orders/${order.id}`}
                
                state={{ 
                  newMessagesCustomer: order.newMessagesCustomer, 
                  newMessagesSeller: order.newMessagesSeller, 
                  newMessagesDiscogs: order.newMessagesDiscogs
                }}
                onClick={(event) => {
                    handleTableRowClick(order)
                  }}
                sx={{
                  textDecoration: 'none',
                  backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    '& .number-box': {
                      color: 'rgba(0, 0, 0, 1)',
                      borderColor: 'rgba(0, 0, 0, 0.25)',
                    },
                  },
                }}
              >
                <TableCell>
                  {order.newMessagesCustomer > 0 && (
                    <Badge
                      badgeContent={
                        <Typography
                          sx={{
                            fontFamily: 'InterSemiBold', // Cambia esto por la fuente que desees
                            fontSize: '10px',
                            color: 'white',
                          }}
                        >
                          {order.newMessagesCustomer}
                        </Typography>
                      }
                      color="error" // Cambia el color del badge (ajusta esto según sea necesario)
                      sx={{
                        '& .MuiBadge-dot': {
                          backgroundColor: 'rgba(254, 117, 114)', // Color del círculo
                        },
                      }}
                    >
                      <Box
                        className="number-box"
                        sx={{
                          fontFamily: 'InterSemiBold',
                          fontSize: 13.5,
                          color: 'rgba(0,0,0,0.8)',
                          backgroundColor: `${getBoxColor(order.status)} 0.2)`,
                          border: `1px solid ${getBoxColor(order.status)} 0.8)`,
                          borderRadius: 1.2,
                          textAlign: 'center',
                          p: 0.7,
                          display: 'inline-block',
                        }}
                      >
                        {order.number}
                      </Box>
                    </Badge>
                  )}
                  {order.newMessagesCustomer < 1 && (
                    <Box
                      className="number-box"
                      sx={{
                        fontFamily: 'InterSemiBold',
                        fontSize: 13.5,
                        color: 'rgba(0,0,0,0.8)',
                        backgroundColor: `${getBoxColor(order.status)} 0.2)`,
                        border: `1px solid ${getBoxColor(order.status)} 0.8)`,
                        borderRadius: 1.2,
                        textAlign: 'center',
                        p: 0.7,
                        display: 'inline-block',
                      }}
                    >
                      {order.number}
                    </Box>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    verticalAlign: 'middle', // Centrar verticalmente
                    position: 'relative', // Para permitir posicionamiento
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-block', // Mantener el texto en línea
                      verticalAlign: 'middle', // Alinear verticalmente
                      width: 235,
                    }}
                  >
                    <Typography
                      sx={{
                        className: 'order-name',
                        fontFamily: 'InterBold',
                        fontSize: '15px',
                        color: 'rgba(0,0,0,0.70)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        width: 'fit-content',
                        height: 'fit-content',
                      }}
                    >
                      {order.items.map((item) => item.name).join(', ')}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'InterSemiBold',
                        fontSize: '11px',
                        color: 'rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word',
                        width: 'fit-content',
                        height: 'fit-content',
                      }}
                    >
                      {order.items.map((item) => item.artists.map((artist) => artist.name)).join(', ')}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      position: 'absolute', // Posicionar el icono
                      right: '18px', // Espacio desde el borde derecho
                      top: '50%', // Centrar verticalmente
                      transform: 'translateY(-50%)', // Ajustar el centrado
                      width: 'fit-content',
                      height: 'fit-content',
                    }}
                  >
                    {newMessagesPoint(order.newMessagesCustomer)}
                  </Box>
                </TableCell>

                <TableCell>
                  <Box  onClick={(event) => event.stopPropagation()} sx={{ justifyContent: 'center' }}>
                    {getBar(order.status, order.id)}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)' }}>
                  <Box sx={{ fontSize: '13px' }}>{order.created}</Box>
                </TableCell>
                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)' }}>
                  {getNotifications(order.notified, order)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableNewOrders;
