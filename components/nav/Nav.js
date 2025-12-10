"use client"
import CompareIcon from '@mui/icons-material/Compare';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReservationDialog from "./ReservationDialog";
import { useSession } from 'next-auth/react';

export const Nav = () => {

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();
    const [anChorEI, setAnchorEI] = useState(null);
    const [reservationOpen, setReservationOpen] = useState(false);
    const { data: session } = useSession();
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleMobileDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;

        }
        setMobileDrawerOpen(open);
    }
    const handleAuthIconClick = () => {
        if (session && session?.user) {
              router.push(`/dashboard/${session?.user?.role}`) 
        }else {
            router.push('/login')
        }
    }
    const handleClick = (event) => {
        setAnchorEI(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEI(null);
    }

    const handleReservationOpen = () => {
        setReservationOpen(true);
    }
    const handleReservationClose = () => {
        setReservationOpen(false);
    }
    const menuItem = (
        <>
            <Link href="/" passHref>
                <Button sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
                    Home
                </Button>

            </Link>


            <Link href="/about" passHref>
                <Button sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
                    About Us
                </Button>

            </Link>
            <Link href="/contact" passHref>
                <Button sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
                    Contact
                </Button>

            </Link>



            <Button
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
                pages
            </Button>

            <Menu onClose={handleClose} anchorEl={anChorEI} open={Boolean(anChorEI)}>
                <MenuItem onClose={handleClose} >
                    <Link href="/about">About</Link>

                </MenuItem>


                <MenuItem onClose={handleClose}>
                    <Link href="/service">Service</Link>

                </MenuItem>

                <MenuItem onClose={handleClose}>
                    <Link href="/contact">Contact</Link>

                </MenuItem>

                <MenuItem onClose={handleClose}>
                    <Link href="/pages">Pages</Link>

                </MenuItem>
            </Menu>





        </>
    )

    return (
        <Box sx={{
            width: "100%", backgroundColor: "white",
            boxShadow: 3, padding: isSmallScreen ? '0.5rem 0' : '1rem 0',
            position: "sticky",
            top: 0,
            zIndex: 1000,
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: isSmallScreen ? "space-between" : "space-evenly",
                alignItems: "center",
                width: isSmallScreen ? "100%" : "auto",
                marginBottom: isSmallScreen ? "1rem" : 0,
                flexDirection: "row"
            }}>

                {
                    isSmallScreen ? (<IconButton>
                        <MenuIcon onClick={toggleMobileDrawer(true)} sx={{ color: "black", zIndex: 10000 }} />
                    </IconButton>) : null
                }
                <Typography
                    onClick={() => router.push("/")}
                    variant="h6" sx={{
                        color: "black",
                        fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}>
                    FoodHub
                </Typography>




                {!isSmallScreen && (
                    <Box sx={{ display: "flex", alignItems: "Center" }}>
                        {menuItem}
                    </Box>
                )}

                {/* Icons and Reservation button */}
                <Box sx={{
                    display: "flex", alignItems: "center",
                    justifyContent: isSmallScreen ? "space-between" : "flex-start",
                    width: isSmallScreen ? "100%" : "auto",
                    marginTop: isSmallScreen ? "1rem" : 0,
                }}>
                    <IconButton sx={{
                        color: "red", marginRight: "0.5rem"
                        , "&:hover": { backgroundColor: "#e60000", color: "white" },
                    }}><ShoppingCartIcon fontSize={isSmallScreen ? "small" : "medium"} /></IconButton>

                    <IconButton sx={{
                        color: "red", marginRight: "0.5rem"
                        , "&:hover": { backgroundColor: "#e60000", color: "white" },
                    }}><CompareIcon fontSize={isSmallScreen ? "small" : "medium"} /></IconButton>
                    <IconButton onClick={handleAuthIconClick} sx={{
                        color: "red", marginRight: "0.5rem"
                        , "&:hover": { backgroundColor: "#e60000", color: "white" },
                    }}>
                        {
                            session?.user ? (
                                session.user.image ? (
                                    <Avatar src={session.user.image} sx={{
                                        width: isSmallScreen ? 24 : 32,
                                        height: isSmallScreen ? 24 : 32
                                    }} alt='user profile' />
                                    // eslint-disable-next-line react/jsx-no-undef
                                ) : (<PersonIcon fontSize={isSmallScreen ? "small" : "medium"} />)


                            ) : (

                                <LoginIcon fontSize={isSmallScreen ? "small" : "medium"} />
                            )
                        }

                    </IconButton>

                    <Button
                        onClick={handleReservationOpen}
                        variant="contained"
                        sx={{
                            backgroundColor: "#e60000",

                            color: "white",
                            borderRadius: "22px",
                            padding: isSmallScreen ? "0.3rem 0.8rem" : "0.5rem 1.5rem",
                            fontSize: isSmallScreen ? "0.7rem" : "0.9rem",

                            "&:hover": { backgroundColor: "#e60000" },
                            display: isSmallScreen ? "none" : "inline-flex"
                        }}
                    >
                        Reservation
                    </Button>
                    {
                        isSmallScreen && (
                            <Button
                                onClick={handleReservationOpen}
                                sx={{
                                    backgroundColor: "#e60000", color: "white",
                                    borderRadius: "22px", padding: "0.3rem 0.8rem", fontSize: "0.7rem", "&:hover": { backgroundColor: "#e60000" }
                                }}
                                variant="contained">
                                Reserve
                            </Button>
                        )
                    }

                </Box>
            </Box>

            <Drawer anchor="left" open={mobileDrawerOpen} onClose={toggleMobileDrawer(false)} >
                <Box sx={{ width: "250" }} role="presentation" onClick={toggleMobileDrawer(false)} onKeyDown={toggleMobileDrawer(false)}>
                    <List>
                        <ListItemText>
                            <Link href="/">Home</Link>
                        </ListItemText>
                    </List>

                    <List>
                        <ListItemText>
                            <Link href="/about">about</Link>
                        </ListItemText>
                    </List>


                    <List>
                        <ListItemText>
                            <Link href="/contact">contact</Link>
                        </ListItemText>
                    </List>

                    <List>
                        <ListItemText>
                            <Link href="/">Home</Link>
                        </ListItemText>
                    </List>
                </Box>
            </Drawer>

            <ReservationDialog
                open={reservationOpen}
                onClose={handleReservationClose}
            />
        </Box>
    )
}