import { useState } from "react";
import axios from "axios";

import { Box, Button, Container, Grid, Link as MuiLink, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";
import Form from '../../utils/Forms'

import AppBar from '../../components/AppBar'
import Footer from '../../components/Footer'

// create styles
const AuthWrapper = styled(Grid)`
    height: 100vh;
`;

const AuthBackgroundCol = styled(Grid)`
    position: relative;
    background-color: rgba(18, 32, 58, 0.6);

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.1);
    }
`;

const AuthBackgroundHolder = styled(Box)`
    width: 100%;
    height: 100%;
    background-image: url('/static/images/LoginImage/LoginImage_3-3264x4928.jpg');
    background-size: cover;
    background-position: center;
`;

function RegisterPage(props) {
    const { handleLogin } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateRegister = () => {
        let validator = Form.validator({
            name: {
                value: name,
                isRequired: true,
            },
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 6
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            return null; // Returns null if validation fails
        }
        
        // Return user data in case of successful authentication
        return {
            name,
            email,
            password,
        };
    }

    const userRegister = async (userData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`, userData);
            if (response.data) {
                handleLogin(response.data, false);
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            alert("User already exists! If you have an account, please login.");
        }
    };

    const register = (e) => {
        e.preventDefault();

        const validate = validateRegister();

        if (validate) {
            setValidate({});
            setName('');
            setEmail('');
            setPassword('');

            userRegister(validate)
        }
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }
    return (
        <div className="RegisterPage">
            <header className="RegisterPage-header">
                <AppBar />
                <Box sx={{ mt: 10 }}>
                    <AuthWrapper container>
                        <AuthBackgroundCol item xs={12} md={5} lg={6}>
                            <AuthBackgroundHolder className="auth-background-holder" />
                            <div className="auth-background-mask"></div>
                        </AuthBackgroundCol>

                        <Grid item xs={12} md={7} lg={6}>
                            <Container maxWidth="sm" sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    width="100%"
                                >
                                    <Typography variant="h5" align="center">
                                        Create your Account
                                    </Typography>
                                    <Box component="form" onSubmit={register} sx={{ mt: 3 }}>
                                        <TextField
                                            error={validate.validate && validate.validate.name}
                                            helperText={
                                                validate.validate && validate.validate.name
                                                    ? validate.validate.name[0]
                                                    : ""
                                            }
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            sx={{ mt: 2 }}
                                        />

                                        <TextField
                                            error={validate.validate && validate.validate.email}
                                            helperText={
                                                validate.validate && validate.validate.email
                                                    ? validate.validate.email[0]
                                                    : ""
                                            }
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            sx={{ mt: 2 }}
                                        />

                                        <TextField
                                            error={validate.validate && validate.validate.password}
                                            helperText={
                                                validate.validate && validate.validate.password
                                                    ? validate.validate.password[0]
                                                    : ""
                                            }
                                            fullWidth
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            sx={{ mt: 2 }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={togglePassword}>
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3 }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <MuiLink component={RouterLink} to="/login" variant="body2">
                                            Have an account? Sign in
                                        </MuiLink>
                                    </Box>
                                </Box>
                            </Container>
                        </Grid>
                    </AuthWrapper>
                </Box>
                <Footer />
            </header>
        </div>
    );
}

export default RegisterPage;