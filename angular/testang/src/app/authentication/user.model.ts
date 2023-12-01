export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private token: string,
    private tokenExpirationDate: Date
  ) {}

  public get getToken(): string {
    if (this.tokenExpirationDate && this.tokenExpirationDate < new Date()) {
      return this.token;
    }
    return null;
  }
}
