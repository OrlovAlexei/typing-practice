export class Email{
  protected constructor(value: string) { }

  static validate(input: string):boolean{
    const inputElement = document.createElement("input");
    inputElement.type = "email";
    inputElement.value = input
    const valid = inputElement.validity.valid
    inputElement.remove()
    return valid
  }

  static from(input: string): Email{
    const valid = this.validate(input)

    if(!valid){
      throw new TypeError(`Input: ${input} cannot be converted to email`);
    }

    return new Email(input)
  }

}