import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    
    const url = 'https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master';
    const query = `mutation SignUp($name: String!, $email: String!, $password: String!, $username: String!) {
        createProfile(data: {name: $name, email: $email, password: $password, username: $username}) {
            id
            name
            username
            email
            password
        }
    }`;

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        username: ''
    });

    const [userId, setUserId] = useState(null); // Updated to null

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                },
            }),
        })
        .then(response => response.json())
        .then(data => {
            const newUserId = data.data.createProfile.id;
            setUserId(newUserId);

            // Publish the new profile
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `mutation { 
                        publishProfile(where: {id: "${newUserId}"}, to: PUBLISHED) { 
                            id
                        }
                    }`
                }),
            });
        })
        .then(res => res.json())
        .then(data => {
            console.log('Profile published successfully:', data);
            navigate('./login')
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        console.log('Form data submitted:', formData);
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
                <div className="col-md-3 col-lg-3">

                <div className='login-box'>
                    <h3 className="text-center my-4">Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
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
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn submit-login">
                            Sign Up
                        </button>
                    </form>
                    <div className="create-account">Ja tem um conta?  Faça <Link to="/login">Login</Link></div>
                
                </div>
            </div>
            </div>
        </div>
        </motion.div>
    );
};

export default SignUpForm;
