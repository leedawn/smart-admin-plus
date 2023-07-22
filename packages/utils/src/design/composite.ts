// 3. 组合。将一组对象保存为树形结构，包含简单叶节点和复杂容器。
abstract class Component {
  private parent!: null | Component;

  public setParent(component: Component | null) {
    this.parent = component;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  public isComposite(): boolean {
    return false;
  }

  public abstract operation(): string;
}

export class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}

export class Composite extends Component {
  private children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    this.setParent(this);
  }

  public remove(component: Component): void {
    const target = this.children.indexOf(component);
    this.children.splice(target, 1);
    this.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public operation(): string {
    let res = [];
    for (const component of this.children) {
      res.push(component.operation());
    }
    return `Branch(${res.join("+")})`;
  }
}
