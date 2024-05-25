import { useState } from "react";
import './style.css';
import {loadStripe} from '@stripe/stripe-js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


import NavBar from "./Navbar";


const Payment=()=>{
   
    const [data,setData]=useState({
        Name:"",
        Amount:""
    });

    const usename=(val)=>{
            setData({...data,Name:val.target.value}) 
    }
    const amount=(val)=>{
            setData({...data,Amount:val.target.value})
        
    }
    
    
    const Paymentfunc= async(event)=>{
       event.preventDefault();

        const stripe= await loadStripe("pk_test_51PKDXmSFvUrzcqKrjCxCOYw9iAVlJnJVksYvmLpZ7CtAIl67HlCssZovgziM2rLJF2JxgbQDzOaMT96P3OIwMx6S00Drhd7w3i")

        const body={
            Data:data
        }
        const headers={
            "Content-Type":"application/json"
        }
        const response=await fetch("http://localhost:7000/api/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        })
        const session=await response.json();
        console.log(session);
        console.log("session");

        const result=stripe.redirectToCheckout({
            sessionId:session.id
        });
        console.log(result);
        if(result.error){
            console.log(result.error);
        }
    }
    return(
           <>
           <NavBar/>
          
        <div className="paymentdiv">
        
        <center>
         <Card sx={{ maxWidth: 345 }}>
      
         <CardContent>
       
         
         <form  onSubmit={Paymentfunc}>
         
            <label className="la" >Name:</label>
            <input onChange={usename} placeholder="Enter the Name" className="regbgc"></input><br/><br/>
            <label className="la" >Amount:</label>
            <input onChange={amount} type="number" placeholder="Enter amount" className="regbgc"></input><br/><br/>
            {/* <button type="submit">Payment</button> */}
            <Button variant="contained" type="submit" sx={{backgroundColor:"black"}}>Payment</Button>
        </form>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
       
      </CardActions>
    </Card>
    </center>
        </div>
        </>
    )
}
export default Payment