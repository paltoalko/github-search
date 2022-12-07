export type UserType = {
  id: number;
  name: string;
  profileUrl: string;
};

export type RepoType = {
  name: string;
  description: string;
  stars: number;
  url: string;
  id: number;
};

export interface UserComponent extends UserType {
  checkAvailableRequests: (res) => void;
}
