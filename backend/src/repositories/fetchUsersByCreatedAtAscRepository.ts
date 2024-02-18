import { User } from "../models";

export interface FetchUsersByCreatedAtAscRepository {
  fetchUsersByCreatedAtAsc(): Promise<User[]>;
}