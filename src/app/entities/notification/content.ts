export class Content {
  private readonly content: string;

  private validateContentLength(content: string) {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error("Content length must be 5-240 characters long");
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }
}
