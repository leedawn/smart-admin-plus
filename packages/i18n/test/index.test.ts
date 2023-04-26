function sum(a, b) {
  return a + b;
}

test("add", () => {
  expect(sum(1, 2)).toBe(3);
});
