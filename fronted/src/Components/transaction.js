import React, { useEffect, useState } from 'react'
import {app,db} from "./firebase";
import {onValue,ref} from "firebase/database";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NavBar from './Navbar';

const Transaction = () => {
  const [data,upData]=useState([]);

  useEffect(()=>{
    onValue(ref(db,`users`),(snapshot)=>{
      
      const usersData = snapshot.val();
      if (usersData) {
        const formattedData = Object.keys(usersData).reverse().map(key => ({
          id: key,
          ...usersData[key]
        }));
        upData(formattedData);
      } else {
        upData([]);
      }
    });
    
  },[]);
  console.log("firebase data");
  console.log(data);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    
    <div>
      <NavBar/>
      <h3 style={{}}>Transactions</h3>
      <h5>Payment Details</h5>
      {
        data.length === 0 ? (
          <>
           <Box sx={{ display: 'flex' ,marginLeft:"50%"}}>
              <CircularProgress />
              
          </Box>
          
          </>
         
        ) : (
          <div >
         
           
               
            <TableContainer component={Paper} sx={{ maxWidth: '50%', margin: '0 auto' }}>
                <Table  sx={{ minWidth: 700 }}  aria-label="customized table">
                <TableHead>
                <TableRow>
            
                    <StyledTableCell align="center">NAME</StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell>
                </TableRow>
                </TableHead> 
                 <TableBody>
                    {data.map((res) => (
                    <StyledTableRow
                        key={res.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        
                    <StyledTableCell align="center">{res.name}</StyledTableCell>
                    <StyledTableCell align="center">{res.amount}</StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
                </TableContainer>
            
         
        </div>
        )
      }

    </div>
  )
}

export default Transaction