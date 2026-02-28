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
                position: 'relative', 
                height: '100%', 
            }}
        >
            
            {!loading && timeAgo && (
                <Box
                    sx={{
                        textDecoration: 'none',
                        position: 'absolute',
                        top: 48, 
                        left: 18, 
                        fontFamily: 'InterRegular',
                        fontSize: '0.75rem',
                        color: 'rgba(0,0,0,0.6)', 
                    }}
                >
                    Discogs Update: {timeAgo}
                </Box>
            )}

            <TableSelector setLoading={setLoading} setTableSelected={setTableSelected} 
            setOrdersPage={setOrdersPage} tableSelected={tableSelected} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <TableFilter filter = {filter} setFilter = {setFilter}/>
            <TableSearcher setOrdersPage={setOrdersPage} setLoading = {setLoading} tableSelected={tableSelected}
                  setSearchTerm={setSearchTerm} />
                <TableOrders
                    setOrdersPage={setOrdersPage}
                    setLoading={setLoading}
                    orders={filteredOrders}
                    loading={loading}
                    searchTerm={searchTerm}
                    tableSelected={tableSelected}
                    numberPage={ordersPage?.number}
                />
            <TableAdd
                setOrdersPage={setOrdersPage}
                setLoading={setLoading}
                tableSelected={tableSelected}
            />
            <Pagination tableSelected={tableSelected} setLoading = {setLoading} ordersPage={ordersPage} 
            searchTerm={searchTerm} setOrdersPage={setOrdersPage} />
                

            
        </Box>
    );
};

export default BoxOrders;
