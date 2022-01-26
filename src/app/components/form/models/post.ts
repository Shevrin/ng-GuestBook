export interface Page {
  length: number;
  pageSize: number;
  pageIndex: number;
  previousPageIndex: number;
}

export interface Data {
  length: any;
  postId: number;
  id: number;
  name: string;
  body: string;
}
