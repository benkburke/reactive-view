export default class Api {
  async get() {
    return Promise.resolve({
      firstName: "Jon",
      lastName: "Smith"
    });
  }
}
