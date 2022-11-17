import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Item } from '.';
import { Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import client from '../../client';
import { DataRequest, UpdateRequestRequest } from '../../backend_pb';
import { objectToRequest } from '../../helper';
import { useSnackbar } from 'notistack';

interface ApproveRequestModalProps {
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
  items: Item[];
}

export default function ApproveRequestModal({ open, onClose, items, onRefetch }: ApproveRequestModalProps) {
  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleApprove = async () => {
    try {
      setLoading(true);
      for (let index = 0; index < items.length; index++) {
        const item = items[index];

        const data = new DataRequest();
        data.setStatus(DataRequest.Status.APPROVED);

        const req = new UpdateRequestRequest();
        req.setId(item.id);
        req.setOriginalRequest(objectToRequest(item.request))
        req.setNewRequest(objectToRequest({
          ...item.request,
          status: DataRequest.Status.APPROVED
        } as DataRequest.AsObject));
        await client.updateRequest(req, {});
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
        Approve Request{items.length > 1 ? 's' : ''}
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
          You are about to approve the following request{items.length > 1 ? 's' : ''}:
        </Typography>
        <Box p={1}>
          {
            items.map((item) => (
              <Box key={item.id} mb={2}>
                <Typography variant='subtitle2'>REQUESTOR</Typography>
                <Typography variant="body2">{item.requestor?.name}</Typography>
                <Typography mt={1} variant='subtitle2'>NODE</Typography>
                <Typography variant="body2">{item.request?.name}</Typography>
                <Typography mt={1} variant='subtitle2'>INPUTS</Typography>
                {
                  item.request?.inputsList.map((input) => (
                    <Typography variant="body2">{input}</Typography>
                  ))
                }
              </Box>
            ))
          }
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">Cancel</Button>
        <Button disabled={loading} onClick={handleApprove} variant="contained" color="primary" autoFocus>
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}
