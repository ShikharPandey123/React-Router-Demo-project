import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "rgba(0,0,0,0.8)",
          color: "white",
          borderRadius: 3,
          boxShadow: 24,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.6rem",
          color: "primary.main",
        }}
      >
        {title || "Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: "grey.300",
            fontSize: "1rem",
          }}
        >
          {message || "Do you really want to proceed with this action?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          gap: 2,
          padding: "0 1.5rem 1rem",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
            },
            padding: "0.5rem 1.2rem",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          sx={{
            bgcolor: "red.700",
            color: "white",
            "&:hover": {
              bgcolor: "red.600",
            },
            padding: "0.5rem 1.2rem",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
