//  命令。将简单操作包装成对象
interface Command {
  execute(): string;
}

export class SimpleCommand implements Command {
  private payload: string;
  constructor(payload: string) {
    this.payload = payload;
  }
  public execute(): string {
    return this.payload;
  }
}

export class ComplexCommand implements Command {
  private payload: string;
  private receiver: Receiver;
  constructor(receiver: Receiver, payload: string) {
    this.receiver = receiver;
    this.payload = payload;
  }
  public execute(): string {
    return this.receiver.doSomething(this.payload);
  }
}

export class Receiver {
  public doSomething(payload: string): string {
    return payload;
  }
}

export class Invoker {
  private onStart!: Command;
  private onEnd!: Command;
  public setStart(command: Command): void {
    this.onStart = command;
  }
  public setEnd(command: Command): void {
    this.onEnd = command;
  }
  private isCommand(command: Command): boolean {
    return command.execute !== undefined;
  }
  public doSomething(): string {
    return this.isCommand(this.onStart) && this.isCommand(this.onEnd) ? this.onStart.execute() + " " + this.onEnd.execute() : "";
  }
}
