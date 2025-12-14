"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
    Typography,
    TextField,
    Button,
    InputAdornment,
    Box,
    Link,
} from "@mui/material";

import { Email as EmailIcon } from "@mui/icons-material";
import {
    AuthContainer,
    ImageSection,
    Overlay,
    ImageContent,
    FormSection,
    FormContainer,
    AuthFooter,
} from "./loginStyles";

const ForgotPasswordPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        setError("");
        setSuccessMessage("");

        if (!email) {
            setError("Email is required");
            setIsSubmitting(false);

            return;
        }

        try {
            const response = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data?.message) {
                setSuccessMessage(data?.message);

                setEmail("");
            } else {
                setError(data?.error || "Failed to send reset link");
            }
        } catch (error) {
            setError(error.message || "an unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthContainer>
            {/* Animated Image Section - Same as login */}

            <ImageSection
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Overlay />

                <ImageContent
                    as={motion.div}
                    initial={{
                        y: 50,
                        opacity: 0,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Reset- Password
                    </Typography>

                    <Typography variant="h6">
                        Discover amazing things and connect with people around he world
                    </Typography>
                </ImageContent>
            </ImageSection>

            {/* Form Section */}
            <FormSection>
                <FormContainer
                    as={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{ fontWeight: 700 }}
                        >
                            Forgot Password
                        </Typography>
                    </motion.div>

                    <Box mt={4}>
                        <form onSubmit={handleSubmit}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </motion.div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Typography color="error" align="center" mt={2}>
                                        {error}
                                    </Typography>
                                </motion.div>
                            )}

                            {successMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Typography color="success.main" align="center" mt={2}>
                                        {successMessage}
                                    </Typography>
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    disabled={isSubmitting}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        color: "white",
                                        backgroundColor: "red",
                                        "&:hover": {
                                            backgroundColor: "red",
                                        },
                                    }}
                                >
                                    {isSubmitting ? " Sending..." : "Send Reset Link"}
                                </Button>
                            </motion.div>
                        </form>

                        <AuthFooter
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <Typography variant="body2">
                                Remember your password?{" "}
                                <Link href="/login" underline="hover">
                                    Sign in here
                                </Link>
                            </Typography>
                            <Typography variant="body2" mt={1}>
                                Don't have an account?{" "}
                                <Link href="/register" underline="hover">
                                    Create one now
                                </Link>
                            </Typography>
                        </AuthFooter>
                    </Box>
                </FormContainer>
            </FormSection>
        </AuthContainer>
    );
};

export default ForgotPasswordPage;

//https://myaccount.google.com/apppasswords

// // Email template function
// function createResetEmail(resetCode, resetLink) {
//   return `
//     <div style="font-family: Arial, sans-serif; padding: 20px;">
//       <div style="max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//         <h2 style="color: #333; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 15px;">Password Reset Request</h2>
//         <p style="color: #555; font-size: 16px; line-height: 1.6;">
//           You requested a password reset. Here's your verification code:
//         </p>
//         <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
//           ${resetCode}
//         </div>
//         <p style="color: #555; font-size: 16px; line-height: 1.6;">
//           Or click the button below to reset your password (valid for 10 minutes):
//         </p>
//         <div style="text-align: center; margin: 25px 0;">
//           <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
//             Reset Password
//           </a>
//         </div>
//         <p style="color: #777; font-size: 14px; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
//           If you didn't request this, please ignore this email or contact support if you have questions.
//         </p>
//       </div>
//     </div>
//   `;
// }


// resetCode: {
//       data: String,
//       expiresAt: {
//           type: Date,
//           default: () => new Date(Date.now() + 10 * 60 * 1000), // 10
//          // minutes in milliseconds
//       },
//   },