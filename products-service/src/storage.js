import data from '../data';

export const storage = {
  getAll(name) {
    return Promise.resolve(data[name] || []);
  },

  async getOne(name, id) {
    const items = await this.getAll(name);
    return items.find((item) => item.id === id);
  },
};
