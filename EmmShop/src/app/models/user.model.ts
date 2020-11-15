export class User {
  constructor(
    public email: string,
    public _token: string
  ) {}

  get token() {
    return this._token;
  }
}
