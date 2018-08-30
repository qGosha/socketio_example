const expect = require('expect');

const {User} = require('./users');

describe('User', () => {
var users;
beforeEach(() => {
 users = new User();
  users.users = [{
    id: '0',
    name: 'ergerg',
    room: 'sdsg'
  },
{
  id: '1',
  name: 'eeee',
  room: 'dfdf'
},
{
  id: '2',
  name: 'rrr',
  room: 'gggg'
}]
});

 it('should add user', () => {
   const users = new User();
   const user = {
     id: '234',
     name: 'ergerg',
     room: 'sdsg'
   }
   const res = users.addUser(user.id, user.name, user.room);

     expect(users.users).toEqual([user]);
 });

 it('should remove user ', () => {
   const user = users.removeUser('1');
     expect(user).toEqual({
       id: '1',
       name: 'eeee',
       room: 'dfdf'
     });
 })

 it('should find user', () => {
   const user = users.getUser('2');
     expect(user).toEqual({
       id: '2',
       name: 'rrr',
       room: 'gggg'
     });
 })
});
