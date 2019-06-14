export class SuGoError extends Error {
  public status: number;
  public code: string;

  constructor(message: string) {
    super(message);
    this.status = 500;
    this.code = "LeroyError";
    this.name = "LeroyError";
  }

  public toJSON() {
    const defaults = {
      message: this.message,
      name: this.name,
      stack: this.stack
    };
    return Object.assign(defaults, this);
  }
}
