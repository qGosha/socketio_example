const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./messages');

describe('generateLocationMessage', () => {
 it('should generate correct location message object', () => {
     const from = "me";
     const lat = "41.1515115";
     const lon = "52.2265655"
   const res = generateLocationMessage(from, lat, lon);
     expect(typeof res.createdAt).toBe('number');
     expect(res.from).toBe(from);
     expect(res.url).toBe(`https://www.google.com/maps?q=${lat},${lon}`);

 })
});

describe('generateMessage', () => {
 it('should generate correct message object', () => {
     const from = "me";
     const text = "text";
   const res = generateMessage(from, text);
     expect(typeof res.createdAt).toBe('number');
     expect(res.from).toBe(from);
     expect(res.text).toBe(text);

 })
});
