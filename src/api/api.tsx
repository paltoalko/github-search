export const searchUsers = async (name: string) => {
  const data = await fetch(`https://api.github.com/search/users?q=${name}&per_page=5`);
  const result = await data.json();

  return result.items;
};

export const getReposList = async (name: string) => {
  const data = await fetch(`https://api.github.com/users/${name}/repos`);
  const result = await data.json();
  return result;
};
