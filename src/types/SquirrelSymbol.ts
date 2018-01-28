class SquirrelSymbol {
  public constructor(public readonly name: string) {
  }

  public toString(): string {
    return `${this.name}`;
  }
}

export default SquirrelSymbol;
