import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { GetRequestRequest, ListRequestsRequest, GetUserInfoRequest, DataRequest, GetUserInfoResponse } from '../../backend_pb';
import client from '../../client';
import DataGrid, { Column } from '../../components/DataGrid';
import DoneOutlineIcon from '@mui/icons-material/Done';
import ApproveRequestModal from './ApproveRequestModal';
import DenyRequestModal from './DenyRequestModal';
import { Close, Delete, Info } from '@mui/icons-material';
import MoreInfoNeededModal from './MoreInfoNeededModal';
import DeleteRequestModal from './DeleteRequestModal';
import { useSnackbar } from 'notistack';

export interface Item {
  id: string;
  request?: DataRequest.AsObject;
  requestor?: GetUserInfoResponse.AsObject;
}

enum Action {
  NONE = "NONE",
  APPROVE = "APPROVE",
  DENY = "DENY",
  MORE = "MORE",
  DELETE = "DELETE",
}

function Requests() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [action, setAction] = useState<Action>(Action.NONE);
  const [rows, setRows] = useState<any[]>([]);
  const [data, setData] = useState<Item[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const columns: Column[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'NAME',
    },
    {
      id: 'inputs',
      numeric: false,
      disablePadding: false,
      label: 'INPUTS',
      render: (row) => {
        return (
          <Box>
            {row.inputsList?.map((item: string) => (
              <Box>{item}</Box>
            ))}
          </Box>
        );
      }
    },
    {
      id: 'results',
      numeric: false,
      disablePadding: false,
      label: 'RESULTS',
    },
    {
      id: 'user',
      numeric: false,
      disablePadding: false,
      label: 'REQUESTOR',
      render: (row) => {

        return (
          <Box display="flex" alignItems="center">
            <Avatar
              src={"data:image/png;base64, " + row.requestor?.profilePic}
              alt={row.requestor?.name}
              sx={{ width: 24, height: 24, marginRight: 1 }}
            />
            {row.requestor?.name}
          </Box>
        )
      }
    },
    {
      id: 'submitted',
      numeric: false,
      disablePadding: false,
      label: 'SUBMITTED',
      render: (row) => moment(row.submitted).format('LT MM/DD')
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const req = new ListRequestsRequest();
      const list = await client.listRequests(req, {});
      const ids = list.getIdList();
      const items: Item[] = [];

      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const req = new GetRequestRequest();
        req.setId(id);
        const res = await client.getRequest(req, {});
        const detail = res.toObject();
        const data: Item = {
          id,
          request: detail.request,
        }
        if (detail.request?.requestorId) {
          const reqUser = new GetUserInfoRequest();
          reqUser.setId(detail.request?.requestorId);
          const resUser = await client.getUserInfo(reqUser, {});
          const detailUser = resUser.toObject();
          data.requestor = detailUser;
        }

        items.push(data);
      }

      setRows(items.map(item => ({
        id: item.id,
        name: item.request?.name,
        inputsList: item.request?.inputsList,
        inputs: item.request?.inputsList.length,
        results: item.request?.results,
        requestor: item.requestor,
        user: item.requestor?.name,
        submitted: moment(item.request?.submittedTimestampUs).set('y', Number(moment().format('YYYY'))).toDate().getTime(),
      })));
      setData(items);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Internal server error");
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const disabled = selected.length === 0;

  const handleCloseModal = () => {
    setAction(Action.NONE);
  }

  const handleRefetch = () => {
    getData();
    setSelected([]);
  }

  console.log(data);

  return (
    <Container>
      <Typography mt={2} mb={1} variant='h4'>Pending requests</Typography>

      <Box mb={1} display="flex" justifyContent="flex-end">
        <Button
          disabled={disabled}
          startIcon={<DoneOutlineIcon />}
          onClick={() => setAction(Action.APPROVE)}
        >
          APPROVE REQUEST
        </Button>
        <Button
          disabled={disabled}
          startIcon={<Info />}
          onClick={() => setAction(Action.MORE)}
        >
          MORE INFO NEEDED
        </Button>
        <Button
          disabled={disabled}
          startIcon={<Close />}
          onClick={() => setAction(Action.DENY)}
        >
          DENY REQUEST
        </Button>
        <Button
          disabled={disabled}
          startIcon={<Delete />}
          onClick={() => setAction(Action.DELETE)}
        >
          DELETE REQUEST
        </Button>
      </Box>
      <DataGrid
        columns={columns}
        rows={rows}
        loading={loading}
        selected={selected}
        setSelected={setSelected}
      />

      <ApproveRequestModal
        open={action === Action.APPROVE}
        onClose={handleCloseModal}
        items={data.filter((item) => selected.includes(item.id))}
        onRefetch={handleRefetch}
      />
      <MoreInfoNeededModal
        open={action === Action.MORE}
        onClose={handleCloseModal}
        items={data.filter((item) => selected.includes(item.id))}
        onRefetch={handleRefetch}
      />
      <DenyRequestModal
        open={action === Action.DENY}
        onClose={handleCloseModal}
        items={data.filter((item) => selected.includes(item.id))}
        onRefetch={handleRefetch}
      />
      <DeleteRequestModal
        open={action === Action.DELETE}
        onClose={handleCloseModal}
        items={data.filter((item) => selected.includes(item.id))}
        onRefetch={handleRefetch}
      />
    </Container>
  );
}

export default Requests;