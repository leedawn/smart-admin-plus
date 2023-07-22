// 4. 建造者。分步骤创建复杂对象，存储查看和创建修改分离

interface Builder {
  producePartA(): void;
}

export class ConcreteBuilder implements Builder {
  private product!: Product;
  constructor() {
    this.reset();
  }
  public reset() {
    this.product = new Product();
  }
  public producePartA(): void {
    this.product.parts.push("partA");
  }
  public getProducts() {
    const res = this.product;
    this.reset();
    return res;
  }
}

class Product {
  public parts: string[] = [];
  public listParts(): string {
    return `all products: ${this.parts.join(",")}`;
  }
}
