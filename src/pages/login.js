import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginForm = () => {
    const url = 'https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master';
    const query = `query Login($email:String!,$password:String!) {
        profiles(where: {OR: [{email: $email}], password: $password}) {
            id
            name
            surname
            username
            bio
            email
        }
    }`;

const navigate = useNavigate();




    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Clear any existing errors

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    email: formData.email,
                    password: formData.password,
                },
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                setError('Login failed. Please check your credentials.');
            } else {
     
                // Handle success (e.g., store token, redirect)
                const idUser = data.data.profiles[0].id
                navigate(`/userprofile/${idUser}`);
            }
        })
        .catch((error) => {
            console.error('Login Error:', error);
            setError('An error occurred during login. Please try again.');
        });

        
    };

    

    return (

        <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
          duration: 0.5,
        }}
      >
        <div className="container-fluid login-container">
            <div className="row justify-content-center row-height">
                <div className="col-sm-8 col-md-3 col-lg-3">
                    <div className='login-box'>
                        <img src='icon.png' style={{width:"10%",display:"block",margin:"0 auto",}}/>
                    <h3 className="text-center my-2">Bem-vindo à Animateka!</h3>
                    <p className="text-center">Faça login para explorar peças exclusivas.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Username or email address "
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn submit-login">
                            Login
                        </button>
                    </form>
                    <div className="create-account">Novo aqui? <Link to="/signup"> Cadastre-se</Link></div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    );
};

export default LoginForm;
