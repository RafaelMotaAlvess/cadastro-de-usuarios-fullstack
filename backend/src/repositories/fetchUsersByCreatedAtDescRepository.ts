import { User } from "../models";

export interface FetchUsersByCreatedAtDescRepository {
  fetchUsersByCreatedAtDesc(): Promise<User[]>;
}