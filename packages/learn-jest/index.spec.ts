function testError() {
  throw new Error("I am error");
}

test("toThrow matcher", () => {
  expect(() => testError()).toThrow(/^I/);
});
