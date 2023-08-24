import { amountFormat } from "../src/amount";

test("format", () => {
  expect(amountFormat(23424.434)).toEqual("23,424.434");
  expect(amountFormat(232424)).toEqual("232,424");
  expect(amountFormat(24.24)).toEqual("24.24");
});
