export interface IEvent {
  _id?: string;
  name?: string;
  description?: string;
  location?: string;
  date?: string;
  creatorId?: string;
  participants?: string[];
  posts?: [PostSchema];
  token?: string;
  createdOn?: number;
}

export interface  PostSchema {
  date: String;
  content: String;
}
