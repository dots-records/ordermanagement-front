import { Box, Typography } from "@mui/material";
import { useState } from "react";
import TablePayments from "./table/TablePayments";
import TableSelector from "./table/TableSelector";
const BoxPayments = ({loading, paymentsPage, setLoading, month, setMonth, year, setYear}) => {
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
                p: '1rem 1rem 0.5rem 1rem'
            }}
        >

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
                alignItems: 'center',
            }}>
                <TableSelector
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}/>
            </Box>

            <Box sx={{
                display: 'flex',
                width:'100%',
                borderBottom: '0.08rem solid rgba(0,0,0,0.15)',
            }}>
                <TablePayments 
                    payments={paymentsPage} 
                    loading={loading}
                />
            </Box>
            
            
        </Box>
    );
};

export default BoxPayments;
