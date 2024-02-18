import { User } from "../models";

export interface FetchUsersByPeriodRepository {
  fetchUsersByPeriod(startDate: Date, endDate: Date): Promise<User[]>;
}