
export class RoleModel {
  item = {};
  constructor() {
    this.set('GUEST', '1');
    this.set('ADMIN', '17286');
  }

  public set(key, value) {
    this.item[key] = value;
  }

  public get(key) {
    return this.item[key];
  }
}
