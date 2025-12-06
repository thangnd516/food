import React from 'react'

import {
    Dialog
    , DialogTitle
    , DialogContent
    , DialogContentText
    , DialogActions,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

export const ReservationDialog = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClickCapture={onClose}

        >
            <DialogTitle sx={{
                mr: 1, backgroundColor: "#e60000", color: "white"
                , "&:hover": {
                    backgroundColor: "#e60000",
                    color: "white"
                }
            }}>
                Book a Table
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form to book a table
                </DialogContentText>
                <TextField autoFocus margin='dense' name='name' label="Name"
                    type='text' fullWidth variant='standard'
                />
                <TextField autoFocus margin='dense' name='phone' label="Phone"
                    type='tel' fullWidth variant='standard'
                />
                <TextField autoFocus margin='dense' name='date' label="Date"
                    type='date' fullWidth variant='standard' InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField margin='dense' name='item' label="Select Item" select fullWidth variant='standard'>
                    
                            <MenuItem key="1" value="1">
                             open 1
                            </MenuItem>
                    
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button sx={{
                    mr: 1, backgroundColor: "#e60000", color: "white"
                    , "&:hover": {
                        backgroundColor: "#e60000",
                        color: "white"
                    }
                }}>
                    Cancel
                </Button>

                <Button sx={{
                    mr: 1, backgroundColor: "#e60000", color: "white"
                    , "&:hover": {
                        backgroundColor: "#e60000",
                        color: "white"
                    }
                }}>
                    BOOK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReservationDialog
