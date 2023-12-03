import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Form from '../../utils/Forms'
import {
    Button,
    TextField,
    Box,
    Grid,
    Typography,
    Link,
    Container,
} from "@mui/material";
import { styled } from "@mui/system";

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
    background-image: url('/static/images/LoginImage/LoginImage_2-4608x2592.jpg');
    background-size: cover;
    background-position: center;
`;

function ForgotPage() {

    const [email, setEmail] = useState('');
    const [validate, setValidate] = useState({});

    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const forgotPassword = (e) => {
        e.preventDefault();

        const validate = validateforgotPassword();

        if (validate) {
            alert('Reset password link is sent to '+email);
            setValidate({});
            setEmail('');
        }
    }

    return (
        <div className="ForgotPage">
            <header className="ForgotPage-header">
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
                                        Forgot Password
                                    </Typography>
                                    <Box component="form" onSubmit={forgotPassword} sx={{ mt: 3 }}>
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
                            
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3 }}
                                        >
                                            Forgot Password
                                        </Button>
                                    </Box>
                        
                                    <Box sx={{ mt: 2 }}>
                                        <Link component={RouterLink} to="/login" variant="body2">
                                            Back to Login
                                        </Link>
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

export default ForgotPage;