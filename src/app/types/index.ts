import { Timestamp } from "firebase/firestore";

export type RecordType = {
  id?: string;
  amount: number;
  purpose: string;
  userId: string;
  timestamp: Timestamp;
};

export type PostType = {
  amount: number;
  purpose: string;
};

export type RecordAction = {
  handleUpdate: (docId: string, { amount, purpose }: PostType) => void;
  handleDelete: (docId: string) => void;
};
