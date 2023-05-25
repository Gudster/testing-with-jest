const stack = require('../src/stack');

test('pop on empty stack returns undefined', () => {
    expect(stack.pop()).toBeUndefined();
});

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(2); // Right answer 1
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(12); // Right answer 1
    stack.push("wow");
    stack.push(13); // Right answer 42
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});
