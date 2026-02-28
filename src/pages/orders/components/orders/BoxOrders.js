import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TableOrders from './table/TableOrders';
import TableSelector from './table/TableSelector';
import TableFilter from './table/TableFilter';
import TableSearcher from './table/TableSearcher';
import Pagination from './table/Pagination';
import TableAdd from './table/TableAdd';

const BoxOrders = ({ loading, setLoading, ordersPage, setOrdersPage, timeAgo}) => {
    const [filter, setFilter] = useState('All');
    const [tableSelected, setTableSelected] = useState('Active Orders');
    const [searchTerm, setSearchTerm] = useState();
    const filteredOrders = ordersPage?.content.filter(order => filter === 'All' || order.status === filter);
    return (
        <Box
            className="box-container"
            sx={{
                display: 'flex',
                position: 'relative', 
                flexDirection: 'column',
                height: '100%',
                alignItems: 'flex-start',
                gap: '0.5rem',
            }}
        >
            <Box sx={{
                display: 'flex',
                width:'100%',
                flexDirection: 'row',
                alignItems: 'flex-start',
            }}>
                <Box>
                    <TableSelector setLoading={setLoading} setTableSelected={setTableSelected} 
                    setOrdersPage={setOrdersPage} tableSelected={tableSelected} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    {!loading && timeAgo && (
                        <Box
                            sx={{
                                fontFamily: 'InterRegular',
                                fontSize: '0.75rem',
                                color: 'rgba(0,0,0,0.6)', 
                            }}
                        >
                            Discogs Update: {timeAgo}
                        </Box>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, gap: '0.5rem' }}>
                    <TableAdd
                        setOrdersPage={setOrdersPage}
                        setLoading={setLoading}
                        tableSelected={tableSelected}
                    />
                    <TableFilter filter = {filter} setFilter = {setFilter}/>
                    <TableSearcher
                        setOrdersPage={setOrdersPage}
                        setLoading={setLoading}
                        tableSelected={tableSelected}
                        setSearchTerm={setSearchTerm}
                    />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                width:'100%',
                border: '1px solid black',
            }}>
                <TableOrders
                    setOrdersPage={setOrdersPage}
                    setLoading={setLoading}
                    orders={filteredOrders}
                    loading={loading}
                    searchTerm={searchTerm}
                    tableSelected={tableSelected}
                    numberPage={ordersPage?.number}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                width:'100%',
                border: '1px solid black',
            }}>
                <Pagination tableSelected={tableSelected} setLoading = {setLoading} ordersPage={ordersPage} 
                        searchTerm={searchTerm} setOrdersPage={setOrdersPage} />
            </Box>
        </Box>
    );
};

export default BoxOrders;
