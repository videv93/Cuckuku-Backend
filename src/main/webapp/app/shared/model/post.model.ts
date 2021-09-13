export interface IPost {
  id?: number;
  title?: string;
  content?: string | null;
}

export const defaultValue: Readonly<IPost> = {};
