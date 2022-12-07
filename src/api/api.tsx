const initial_url = 'https://api.github.com';

export const searchUsers = async (name: string) => {
  const data = await fetch(`${initial_url}/search/users?q=${name}&per_page=5`);
  const result = await data.json();

  return result.items;
};

export const getReposList = async (name: string) => {
  const data = await fetch(`${initial_url}/users/${name}/repos`);
  const result = await data.json();
  return result;
};

export const checkRequest = async () => {
  const data = await fetch(`${initial_url}/rate_limit`);
  const result = await data.json();
  return result.rate;
};
