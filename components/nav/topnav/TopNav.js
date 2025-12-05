"use client"
import { styles } from './navbarStyle';
import Box from "@mui/material/Box";
import { Typography, IconButton } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
export default function NavBar() {
    return (
        <Box component="nav" sx={styles.navbarContainer}>
            <Box sx={styles.contentWrapper} >

                {/* LEFT SIDE */}
                <Box sx={styles.leftContact}>
                    <Box sx={styles.contactItem}>
                        <IconButton size='small' sx={styles.iconButton}>
                            <LocalPhoneIcon />
                        </IconButton>
                        <Typography variant='body2' sx={styles.contactText}>
                            +8401100011
                        </Typography>
                    </Box>

                    <Box sx={styles.contactItem}>
                        <IconButton size='small' sx={styles.iconButton}>
                            <EmailIcon />
                        </IconButton>
                        <Typography variant='body2' sx={styles.contactText}>
                            Text@gmail.com
                        </Typography>
                    </Box>
                </Box>

                {/* RIGHT SIDE */}
                <Box sx={styles.socialIcons}>
                    <IconButton sx={styles.iconButton}>
                        <FacebookIcon />
                    </IconButton>

                    <IconButton sx={styles.iconButton}>
                        <InstagramIcon />
                    </IconButton>

                    <IconButton sx={styles.iconButton}>
                        <XIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>

    )
}