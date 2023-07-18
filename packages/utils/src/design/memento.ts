// 6. 备忘录。生成对象的状态并在之后还原
export class Originator {
  private state: string;
  constructor(state: string) {
    this.state = state;
  }
  public doSomething(): string {
    const str = "abcdefghijklmnopqrstuvwxyz";
    this.state = new Array(30)
      .fill("")
      .map(() => str[~~(Math.random() * str.length)])
      .join(",");
    return this.state;
  }
  public save(): Memento {
    return new Memento(this.state);
  }
  public restore(memento: Memento): void {
    this.state = memento.getState();
  }
}
class Memento {
  private state: string;
  private date: string;
  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 23).replace("T", " ");
  }
  public getState(): string {
    return this.state.substring(0, 12);
  }
  public getName(): string {
    return this.getState() + " " + this.getDate();
  }
  public getDate(): string {
    return this.date;
  }
}
export class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;
  constructor(originator: Originator) {
    this.originator = originator;
  }
  public backup(): void {
    this.mementos.push(this.originator.save());
  }
  public undo(): void {
    if (!this.mementos.length) return;
    this.originator.restore(this.mementos.pop() as Memento);
  }
  public showHistory(): void {
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}
