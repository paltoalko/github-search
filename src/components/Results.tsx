import React, { useState } from 'react';
import styles from '../assets/styles/Results.module.css';
import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography,
  Collapse,
  Paper,
  Badge,
  ListItem
} from '@mui/material';
import { RepoType, UserType } from '../assets/typings/types';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ExpandLess, ExpandMore, StarOutlined } from '@mui/icons-material';
import { getReposList } from '../api/api';
import data from '../reposResponse.json';

interface IProps {
  users?: UserType[] | undefined;
  searchQuery?: string;
}

const UserElement: React.FC<UserType> = ({ id, name }) => {
  const [openRepos, setOpenRepos] = useState(false);
  const [userRepos, setUserRepos] = useState<RepoType[]>([]);

  const createRepos = (repos) => {
    const newRepos = repos.map((el) => {
      const repo = {
        name: el.name,
        description: el.description,
        stars: el.stargazers_count,
        url: el.html_url,
        id: el.id
      };
      return repo;
    });
    setUserRepos(newRepos);
  };

  const handleClick = () => {
    // getReposList(name);
    createRepos(data);
    setOpenRepos(!openRepos);

    console.log(userRepos);

    //get available repos from that person
  };
  return (
    <Paper sx={{ mb: '0.5em' }} className={styles.listItem}>
      <ListItemButton key={id} onClick={handleClick}>
        <ListItemIcon>
          <AccountCircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {openRepos ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openRepos} timeout="auto" unmountOnExit>
        {userRepos?.map((el) => (
          <List component="div" disablePadding key={el.id}>
            <ListItem sx={{ pl: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <ListItemText
                  disableTypography
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(el.url, '_blank')?.focus();
                  }}
                  primary={
                    <Typography variant="body1" color="primary" sx={{ cursor: 'pointer' }}>
                      {el.name}
                    </Typography>
                  }
                />
                <ListItemText
                  disableTypography
                  primary={<Typography variant="body2">{el.description}</Typography>}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <ListItemIcon>
                  <Badge badgeContent={el.stars} color="primary">
                    <StarOutlined color={el?.stars ? 'warning' : 'disabled'} />
                  </Badge>
                </ListItemIcon>
              </Box>
            </ListItem>
          </List>
        ))}
      </Collapse>
    </Paper>
  );
};

const Results: React.FC<IProps> = ({ users, searchQuery }) => {
  return (
    <Box className={styles.resultsContainer}>
      <Box className={styles.resultsBox}>
        <Typography variant="h2">Results</Typography>
        <div className={styles.divider} />
        <Typography variant="subtitle1" fontWeight={400}>
          Showing users for &apos;{searchQuery}&apos;
        </Typography>

        <List
          className={styles.searchResults}
          aria-labelledby="results-nested-list"
          sx={{ width: '70vw' }}>
          {users?.map((user) => (
            <UserElement key={user.id} id={user.id} name={user.name} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Results;
