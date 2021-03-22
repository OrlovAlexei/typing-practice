export class Password{
  private static VALIDATOR = /^[a-zA-Z1-9._]+@*\.com$/;

  protected constructor(value: string) { }

  private static validate(input: string):boolean{
    return this.VALIDATOR.test(input)
  }

  static from(input: string): Password{
    const valid = this.validate(input)

    if(!valid){
      throw new TypeError(`Input: ${input} cannot be converted to password`);
    }

    return new Password(input)
  }

}