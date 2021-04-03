import * as t from "runtypes"

function validate(input: string):boolean{
  const inputElement = document.createElement("input");
  inputElement.type = "email";
  inputElement.value = input
  const valid = inputElement.validity.valid
  inputElement.remove()
  return valid
}

export const Email = t.String.withBrand("Email").withConstraint(input => {

  const valid = validate(input)

  if(!valid){
    throw new TypeError(`Input: ${input} cannot be converted to email`);
  }

  return input
})


export type Email = t.Static<typeof Email>