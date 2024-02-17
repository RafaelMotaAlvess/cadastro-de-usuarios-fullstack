import { User } from "../models";

export interface FetchUserRepository {
  fetchUsers(): Promise<User[]>;
}