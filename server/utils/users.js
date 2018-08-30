[{
  id: '3434g34g3533',
  name: 'ergerg',
  room: 'fans'
}]


class User {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
   const user = this.getUser(id);
   this.users = this.users.filter(i => i.id !== id);
   return user;
  }
  getUser(id) {
  return this.users.filter( i => i.id === id)[0];
  }
  getUserList(room) {
    const users = this.users.filter( i => i.room === room );
    const names = users.map( i => i.name);
    return names;
  }
}


module.exports = {User};
