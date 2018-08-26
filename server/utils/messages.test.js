const expect = require('expect');

const {generateMessage} = require('./messages');

describe('generateMessage', () => {
 it('should generate correct message object', () => {
     const from = "me";
     const text = "text";
   const res = generateMessage(from, text);
     expect(typeof res.createdAt).toBe('number');
     expect(res.from).toBe(from);
     expect(res.text).toBe(text);

 })
})
