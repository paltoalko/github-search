import React, { useEffect, useState } from 'react';
import styles from '../assets/styles/HomePage.module.css';
import { Box, CircularProgress, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import Results from './Results';
import { checkRequest, searchUsers } from '../api/api';
import { UserType } from '../assets/typings/types';

const HomePage: React.FC<{}> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    checkRequest()
      .then((res) => {
        checkAvailableRequests(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const checkAvailableRequests = (res) => {
    setRemainingRequests(res.remaining);
    const newDate = new Date(res.reset).toTimeString();
    setDate(newDate);
  };

  const createUsers = (searchResults) => {
    const newList = searchResults.map((el) => {
      const user = {
        id: el.id,
        name: el.login,
        profileUrl: el.html_url
      };
      return user;
    });
    setLoading(false);
    setUsers(newList);
  };

  const handleSearch = (e: string) => {
    setLoading(true);
    setSearchQuery(e);
    searchUsers(e)
      .then((res) => {
        if (res.length === 0) {
          createUsers([]);
        } else {
          createUsers(res);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box className={styles.homeContainer}>
      <Box className={styles.homeBox}>
        <Typography variant="h1">Github Search</Typography>
        <SearchBar handleSearch={handleSearch} />
        <Box sx={{ width: '100%' }}>
          {searchQuery && (
            <Results
              searchQuery={searchQuery}
              users={users}
              checkAvailableRequests={checkAvailableRequests}
            />
          )}
          {loading && (
            <Box className={styles.progress}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
      <Typography className={styles.remainingText} variant="body2" fontWeight={200}>
        Remaining requests {remainingRequests}/60. Resets on {date}.
      </Typography>
    </Box>
  );
};

export default HomePage;
