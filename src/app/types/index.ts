export type SecondsType = {
  _seconds: number;
  _nanoseconds: number;
};

export type RecordType = {
  id: string;
  price: number;
  category: string;
  createdAt: SecondsType;
  updatedAt: SecondsType;
};

export type PostType = {
  price: number;
  category: string;
};

export type RecordAction = {
  handleUpdate: (docId: string, { price, category }: PostType) => void;
  handleDelete: (docId: string) => void;
};
