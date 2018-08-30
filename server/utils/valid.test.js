const expect = require('expect');

const {isRealString} = require('./valid');


describe('isRealString', () => {
 it('should reject non valid str', () => {
   const res = isRealString({});
     expect(res).toBeFalsy();
 })
 it('should reject only spaces str', () => {
   const res = isRealString('    ');
     expect(res).toBeFalsy();
 })
 it('should accept valid str', () => {
   const res = isRealString('asvasav');
     expect(res).toBeTruthy();   
 })
});
