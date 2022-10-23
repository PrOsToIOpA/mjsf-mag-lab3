export class ITodoRepository {
  save() {
    throw new Error("Not implemented");
  }

  find() {
    throw new Error("Not implemented");
  }

  fetch() {
    throw new Error("Not implemented");
  }

  delete() {
    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }
}

export class TodoLocalStorageRepository extends ITodoRepository {
  __getItems() {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem("todos")) : [];
  }

  save(model) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      items.push(model);
      localStorage.setItem("todos", JSON.stringify(items));
      resolve(model);
    })
  }

  find(id) {
    return new Promise((resolve) => {
      const items = this.__getItems();
      const res = items.filter((item) => {
        return item.id === id
      });
      if (res.length > 0) {
        return resolve(res[0]);
      }
      return resolve(null);
    })
  }

  fetch() {
    return new Promise((resolve) => {
      resolve(this.__getItems());
    })
  }

  async update(id, payload = {}) {
    const item = await this.find(id);
    if (item) {
      const items = this.__getItems();
      const idx = items.findIndex((el) => el.id === item.id);
      items[idx] = payload;
      localStorage.setItem("todos", JSON.stringify(items));
    }
    return null;
  }

  async delete(id) {
    const item = await this.find(id);
    if (item) {
      const items = this.__getItems();
      const idx = items.findIndex((el) => el.id === item.id);
      items.splice(idx, 1);
      localStorage.setItem("todos", JSON.stringify(items));
    }
    return null;
  }
}
