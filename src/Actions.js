import { makeAutoObservable, observe } from "mobx";
import Store from "./Store";

class Actions {
  viewModel = null;

  constructor() {
    this.store = new Store();
    this.viewModel = { formattedString: null, fName: null, lName: null };

    makeAutoObservable(this);
  }

  load = async () => {
    observe(this.store, "programmersModel", obj => {
      this.viewModel = {
        formattedString:
          "Hello your name is " + obj.newValue.fName + " " + obj.newValue.lName,
        fName: obj.newValue.fName,
        lName: obj.newValue.lName
      };
    });

    await this.store.load();
  };

  submit = viewModel => {
    this.store.updateProgrammersModel(viewModel.fName, viewModel.lName);
  };
}

export const actions = new Actions();
