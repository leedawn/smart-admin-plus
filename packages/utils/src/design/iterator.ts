// 4. 迭代器。不暴露复杂结构细节的条件下遍历里面的元素
export class OrderIterator {
  private collection: Collection;
  private position: number;
  private reverse: boolean;

  constructor(collection: Collection, reverse?: boolean) {
    this.collection = collection;
    if (reverse) {
      this.position = this.collection.getCounts() - 1;
      this.reverse = true;
    } else {
      this.position = 0;
      this.reverse = false;
    }
  }

  public rewind(): void {
    this.position = this.reverse ? this.collection.getCounts() - 1 : 0;
  }
  public key(): number {
    return this.position;
  }
  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }
  public current(): string {
    return this.collection.getItems()[this.position];
  }
  public isValid(): boolean {
    return this.reverse ? this.position >= 0 : this.position < this.collection.getCounts();
  }
}

export class Collection {
  private items: string[] = [];
  public getCounts(): number {
    return this.items.length;
  }
  public getItems(): string[] {
    return this.items;
  }
  public addItem(item: string): void {
    this.items.push(item);
  }
  public getIterator(): OrderIterator {
    return new OrderIterator(this);
  }
  public getReverseIterator(): OrderIterator {
    return new OrderIterator(this, true);
  }
}


