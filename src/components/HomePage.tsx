import React, { useState } from 'react';
import styles from '../assets/styles/HomePage.module.css';
import { Box, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import Results from './Results';
import data from '../response.json';
import { searchUsers } from '../api/api';
import { UserType } from '../assets/typings/types';

const Start: React.FC<{}> = () => {
  const searchResults = data.items;
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const createUsers = (searchResults) => {
    const newList = searchResults.map((el) => {
      const user = {
        id: el.id,
        name: el.login
      };
      return user;
    });
    setUsers(newList);
  };

  const handleSearch = (e) => {
    setSearchQuery(e);
    createUsers(searchResults);
    // searchUsers(e)
    //   .then((res) => {
    //     setSearchResults(res);
    //   })
    //   .catch((err) => console.log(err));
  };
  return (
    <Box className={styles.homeContainer}>
      <Typography variant="h1">Github Search</Typography>
      <SearchBar handleSearch={handleSearch} />
      <Box sx={{ width: '100%' }}>
        {searchQuery && <Results searchQuery={searchQuery} users={users} />}
      </Box>
    </Box>
  );
};

export default Start;
