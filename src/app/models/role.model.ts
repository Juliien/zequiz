
export class RoleModel {
  item = {};
  constructor() {
    this.set('FREE', 1);
    this.set('PAID', 295) ;
    this.set('ADMIN', 17286);
  }

  public set(key,value) {
    this.item[key] = value;
  }

  public get(key) {
    return this.item[key];
  }
}
