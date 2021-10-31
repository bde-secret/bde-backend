import { helloWorld } from './hello-world';

test('HelloWorld test', () => {
  expect(helloWorld()).toBe('Hello World!');
});
