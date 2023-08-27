export interface KanbanItem {
    id?: number,
    todo: string,
    priority: number, // 0,1,2
    status: number // 0,1,2
}