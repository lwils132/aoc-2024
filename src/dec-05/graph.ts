export class Graph {
  /**
   * Predecessor -> all successors
   * @private
   */
  private startMap = new Map<number, Set<number>>();

  /**
   * Successor -> all predecessors
   * @private
   */
  private endMap = new Map<number, Set<number>>();

  private vertices = new Set<number>();

  /**
   * Add an edge, duplicates ignored.
   */
  addEdge(predecessor: number, successor: number): void {
    const successors = this.startMap.get(predecessor) ?? new Set<number>();
    successors.add(successor);
    this.startMap.set(predecessor, successors);

    const predecessors = this.endMap.get(successor) ?? new Set<number>();
    predecessors.add(predecessor);
    this.endMap.set(successor, predecessors);

    this.vertices.add(predecessor);
    this.vertices.add(successor);
  }

  hasVertex(vertex: number): boolean {
    return this.vertices.has(vertex);
  }

  isTopologicallySorted(arr: number[]): boolean {
    for (let i = 0; i < arr.length; i++) {
      const subArr = arr.slice(i + 1);
      const subject = arr[i];

      if (subArr.some((vertex) => this.startMap.get(vertex)?.has(subject))) {
        return false;
      }
    }
    return true;
  }
}
