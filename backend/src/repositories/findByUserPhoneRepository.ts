export interface FindByUserPhoneRepository {
  findByPhone(phone: string): Promise<boolean>;
}