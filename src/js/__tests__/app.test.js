import Note from '../Note.js';
import data from '../repo.js';

test('should inited', () => {
  expect(data.length).toBe(0);
  data.push(new Note('phone', 100));
  expect(data.length).toBe(1);
});
