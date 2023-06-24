// 通过树和图看如何从无序中找到路径和秩序

// 1. 图的概念。图是由一组边连接的顶点。
//   相邻顶点：一条边连接的顶点
//   度：一个顶点的相邻顶点的数量
//   路径：一组顶点构成的连续序列
//   最短路径：没有重复顶点的路径
//   环：起始顶点和最后的顶点重合的最短路径
// 2. 图可以是有向的和无向的，两个顶点双向都有路径则称为强联通，每条边都有权重称为加权图
// 3. 图的表示：邻接矩阵（二维数组，行和列都是顶点。不适合稀疏图，增加删除顶点不方便），临接表（可以存放一个顶点的相领顶点列表），关联矩阵（二维数组，行表示顶点，列表示边。适合边比顶点多的情况）

// 4. 使用邻接表实现图
export default class Graph {
  // 存储图的顶点
  private vertices: Array<number | string> = [];

  // 存储临接表
  private adjList: Map<string | number, Array<string | number>> = new Map();

  constructor(private isDirected: boolean = false) {}

  // 添加顶点
  addVertex = (v: string | number): void => {
    // 顶点不存在于图中
    if (!this.vertices.includes(v)) {
      // 将该顶点添加到顶点列表中
      this.vertices.push(v);
      // 在临接表中设置顶点v作为键，对应的字典值为一个空数组
      this.adjList.set(v, []);
    }
  };

  // 添加线，连接顶点
  addEdge = (v: string | number, w: string | number): void => {
    // 添加顶点之前需要验证顶点v和w是否在图中，不存在就追加
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }

    // 将w加入到v的临接表中，我们就得到了一条来自顶点v到顶点w的边
    this.adjList.get(v)?.push(w);
    if (!this.isDirected) {
      // 如果是无向图则需要添加一条自w到v的边
      this.adjList.get(w)?.push(v);
    }
  };

  // 获取顶点列表
  getVertices = (): Array<string | number> => {
    return this.vertices;
  };

  // 获取临接表
  getAdjList = (): Map<string | number, Array<string | number>> => {
    return this.adjList;
  };

  // 将图转为字符串
  toString(): string {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = <Array<string | number>>this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += "\n";
    }
    return s;
  }
}
const graph = new Graph();
const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i]);
}

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log("图的关系对应如下");
console.log(graph.toString());
