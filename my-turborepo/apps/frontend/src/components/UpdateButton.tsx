"use client";

import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../store/reducers';
import { fetchUser } from '../apis/userApi';

export default function UpdateButton() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state: any) => state.user);

  const handleFetch = async () => {
    dispatch(fetchUserStart());
    try {
      const userData = await fetchUser('test123');
      dispatch(fetchUserSuccess(userData));
    } catch (err: any) {
      dispatch(fetchUserFailure(err.message));
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleFetch}>
        Fetch User
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {data && <Typography>{JSON.stringify(data)}</Typography>}
    </div>
  );
}
