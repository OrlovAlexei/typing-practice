import * as t from "runtypes"

const VALIDATOR = /^[a-zA-Z1-9._]+@*\.com$/;

function validate(input: string):boolean{
  return VALIDATOR.test(input)
}

export const Password = t.String.withBrand("Password").withConstraint(input => {

  const valid = validate(input)

  if(!valid){
    throw new TypeError(`Input: ${input} cannot be converted to email`);
  }

  return input
})


export type Password = t.Static<typeof Password>
