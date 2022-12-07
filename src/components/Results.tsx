import React, { useEffect, useState } from 'react';
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
  ListItem,
  CircularProgress
} from '@mui/material';
import { RepoType, UserComponent, UserType } from '../assets/typings/types';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ExpandLess, ExpandMore, StarOutlined } from '@mui/icons-material';
import { checkRequest, getReposList } from '../api/api';

interface IProps {
  users?: UserType[] | undefined;
  searchQuery?: string;
  checkAvailableRequests: (res) => void;
}

const UserElement: React.FC<UserComponent> = ({ id, name, profileUrl, checkAvailableRequests }) => {
  const [openRepos, setOpenRepos] = useState(false);
  const [userRepos, setUserRepos] = useState<RepoType[]>([]);
  const [noRepos, setNoRepos] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkRequest()
      .then((res) => {
        checkAvailableRequests(res);
      })
      .catch((err) => console.log(err));
  }, [openRepos]);

  const createRepos = (repos) => {
    setLoading(false);
    if (repos.length == 0) {
      setNoRepos(true);
    } else {
      setNoRepos(false);
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
    }
  };

  const handleClick = () => {
    if (openRepos == false) {
      setLoading(true);
      getReposList(name)
        .then((res) => {
          createRepos(res);
        })
        .catch((err) => console.log(err));
    }

    setOpenRepos(!openRepos);
  };
  return (
    <Paper sx={{ mb: '0.5em' }} className={styles.listItem}>
      <ListItemButton key={id} onClick={handleClick} aria-label="User repositories">
        <ListItemIcon
          aria-label="User profile link"
          onClick={(e) => {
            e.preventDefault();
            window.open(profileUrl, '_blank')?.focus();
          }}>
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
                  aria-label="User repository link"
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
        {noRepos && (
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="body1" color="primary" sx={{ cursor: 'pointer' }}>
                      This user doesn&apos;t have any repositories.
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          </List>
        )}
        {loading && (
          <List component="div" disablePadding>
            <ListItem sx={{ p: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  justifyConten: 'center',
                  alignItems: 'center'
                }}>
                <CircularProgress />
              </Box>
            </ListItem>
          </List>
        )}
      </Collapse>
    </Paper>
  );
};

const Results: React.FC<IProps> = ({ users, searchQuery, checkAvailableRequests }) => {
  useEffect(() => {
    checkRequest()
      .then((res) => {
        checkAvailableRequests(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box className={styles.resultsContainer}>
      <Box className={styles.resultsBox}>
        <Typography variant="h2">Results</Typography>
        <div className={styles.divider} />
        <Typography variant="subtitle1" fontWeight={400}>
          Showing users for &apos;{searchQuery}&apos;
        </Typography>

        {users.length > 0 && (
          <List
            className={styles.searchResults}
            aria-labelledby="results-nested-list"
            sx={{ width: '70vw' }}>
            {users?.map((user) => (
              <UserElement
                key={user.id}
                id={user.id}
                name={user.name}
                profileUrl={user.profileUrl}
                checkAvailableRequests={checkAvailableRequests}
              />
            ))}
          </List>
        )}

        {users.length == 0 && (
          <Box className={styles.searchResults} sx={{ width: '70vw' }}>
            <Typography variant="body1" sx={{ fontSize: '1.5em' }} fontWeight={500} color="error">
              No users were found.
            </Typography>
            <Typography variant="body1" fontWeight={500} color="error">
              Try searching for another username.
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              Remember that username:{' '}
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              - May only contain alphanumeric characters or hyphens. <br />
              - Cannot have multiple consecutive hyphens. <br />
              - Cannot begin or end with a hyphen.
              <br />- Maximum is 39 characters.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Results;
