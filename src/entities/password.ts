import * as t from "runtypes";

const VALIDATOR = /^[a-zA-Z1-9._]+@*\.com$/;

function validate(input: string): boolean {
  return VALIDATOR.test(input);
}

export const Password = t.String.withBrand("Password").withConstraint(
  (input) =>
    validate(input) || `Input: ${input} cannot be converted to password`
);

export type Password = t.Static<typeof Password>;
