export class BaseModel {
  [key: string]: any;

  constructor(attributes?: any) {
    if (attributes) {
      Object.keys(attributes).forEach((key: string) => {
        this[key] = attributes[key];
      });
    }
  }
}
