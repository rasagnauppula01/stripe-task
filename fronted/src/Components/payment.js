import { useState } from "react";
import './style.css';
import { loadStripe } from '@stripe/stripe-js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import NavBar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const [data, setData] = useState({
        Name: "",
        Amount: ""
    });

    const [errors, setErrors] = useState({
        Name: "",
        Amount: ""
    });

    const usename = (val) => {
        setData({ ...data, Name: val.target.value });
    };

    const amount = (val) => {
        const value = val.target.value;
        if (Number(value) >= 0) {
            setData({ ...data, Amount: value });
            setErrors({ ...errors, Amount: "" });
        } else {
            setErrors({ ...errors, Amount: "Amount must be a positive value" });
        }
    };

    const validateForm = () => {
        let valid = true;
        let nameError = "";
        let amountError = "";

        if (!data.Name.trim()) {
            nameError = "Name is required";
            valid = false;
            toast.error(nameError);
        }
        <br></br>
       
        if (data.Amount === "" || Number(data.Amount) <= 0) {
            amountError = "Amount must be a positive value";
            valid = false;
            toast.error(amountError);
        }

        setErrors({
            Name: nameError,
            Amount: amountError
        });

        return valid;
    };

    const Paymentfunc = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const stripe = await loadStripe("pk_test_51PKDXmSFvUrzcqKrjCxCOYw9iAVlJnJVksYvmLpZ7CtAIl67HlCssZovgziM2rLJF2JxgbQDzOaMT96P3OIwMx6S00Drhd7w3i");

        const body = {
            Data: data
        };
        const headers = {
            "Content-Type": "application/json"
        };
        const response = await fetch("https://stripe-task.onrender.com/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const session = await response.json();
        console.log("session");

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });
        console.log(result);
        if (result.error) {
            console.log(result.error);
        }
    };

    return (
        <>
            <NavBar />

            <div className="paymentdiv">
                <center>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <form onSubmit={Paymentfunc}>
                                <label className="la">Name:</label>
                                <input
                                    onChange={usename}
                                    placeholder="Enter the Name"
                                    className="regbgc"
                                />
                                
                                <br /><br />
                                <label className="la">Amount:</label>
                                <input
                                    onChange={amount}
                                    type="number"
                                    placeholder="Enter amount"
                                    className="regbgc"
                                    min="0"
                                />
                                
                                <br /><br />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ backgroundColor: "black" }}
                                >
                                    Payment
                                </Button>
                            </form>
                        </CardContent>
                        <CardActions>
                            {/* <Button size="small">Share</Button> */}
                        </CardActions>
                    </Card>
                </center>
            </div>
            <ToastContainer />
        </>
    );
};

export default Payment;

