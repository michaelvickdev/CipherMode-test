import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Item } from '.';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import client from '../../client';
import { DataRequest, UpdateRequestRequest } from '../../backend_pb';
import { objectToRequest } from '../../helper';
import { useSnackbar } from 'notistack';

interface DenyRequestModalProps {
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
  items: Item[];
}

export default function DenyRequestModal({ open, onClose, items, onRefetch }: DenyRequestModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  
  const { enqueueSnackbar } = useSnackbar();
  
  const handleDeny = async () => {
    try {
      setLoading(true);
      for (let index = 0; index < items.length; index++) {
        const item = items[index];

        const req = new UpdateRequestRequest();
        req.setId(item.id);
        req.setOriginalRequest(objectToRequest(item.request))
        const commentList = [...(item.request?.commentList || [])];
        if (inputValue) {
          commentList?.push(inputValue);
        }
        req.setNewRequest(objectToRequest({
          ...item.request,
          commentList,
          status: DataRequest.Status.REJECTED
        } as DataRequest.AsObject));
        await client.updateRequest(req, {});
      }
      setLoading(false);
      setInputValue('');
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
        <Typography variant="body2">
          REASON (OPTIONAL)
        </Typography>
        <Box>
          <TextField
            multiline
            minRows={3}
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter denial reason"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">Cancel</Button>
        <Button disabled={loading} onClick={handleDeny} variant="contained" color="primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
