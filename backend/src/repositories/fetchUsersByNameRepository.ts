import { User } from "../models";

export interface FetchUsersByNameRepository {
  fetchUsersByName(name: string): Promise<User[]>;
}