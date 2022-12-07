import React, { useState } from 'react';
import styles from '../assets/styles/SearchBar.module.css';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

interface IProps {
  handleSearch: (e: string) => void;
}

const SearchBar: React.FC<IProps> = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  return (
    <Box className={styles.searchContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery == '') {
            setError('Username cannot be empty.');
          } else {
            handleSearch(searchQuery);
          }
        }}>
        <TextField
          id="search-bar"
          className="text"
          label="Github username"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setError('');
            setSearchQuery((e.target as HTMLInputElement).value);
          }}
          helperText={error}
          placeholder="Search..."
          size="small"
          sx={{ minWidth: '30vw' }}
          inputProps={{
            maxLength: 39
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon color="primary" />
              </InputAdornment>
            )
          }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchOutlinedIcon color="primary" />
        </IconButton>
      </form>
    </Box>
  );
};

export default SearchBar;
