import { User } from "../models";

export interface FetchUsersByCreatedAtRepository {
  fetchUsersByCreatedAt(date: Date): Promise<User[]>;
}