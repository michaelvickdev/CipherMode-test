import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Item } from '.';
import { IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import client from '../../client';
import { DeleteRequestRequest } from '../../backend_pb';
import { useSnackbar } from 'notistack';

interface DeleteRequestModalProps {
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
  items: Item[];
}

export default function DeleteRequestModal({ open, onClose, items, onRefetch }: DeleteRequestModalProps) {
  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      setLoading(true);
      for (let index = 0; index < items.length; index++) {
        const item = items[index];

        const req = new DeleteRequestRequest();
        req.setId(item.id);

        await client.deleteRequest(req, {});
      }
      setLoading(false);
      onRefetch();
      onClose();
      enqueueSnackbar("Success", { variant: 'success' });
    } catch (error) {
      enqueueSnackbar("Failed", { variant: 'error' });
      setLoading(false);
    }
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="approve-request-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="approve-request-title">
        Deny Request{items.length > 1 ? 's' : ''}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 6
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the selected request? This action can't be undone
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">Cancel</Button>
        <Button disabled={loading} onClick={handleDelete} variant="contained" color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
