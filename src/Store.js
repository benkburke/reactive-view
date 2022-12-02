import { action, makeAutoObservable } from "mobx";
import Api from "./Api";

export default class Store {
  programmersModel = null;

  constructor() {
    this.api = new Api();
    this.programmersModel = { fName: null, lName: null };

    makeAutoObservable(this);
  }

  async load() {
    const dto = await this.api.get();
    this.programmersModel = { fName: dto.firstName, lName: dto.lastName };
  }

  updateProgrammersModel = action((fName, lName) => {
    this.programmersModel = { fName: fName, lName: lName };
  });
}
