import { z } from "zod";

export type PostType = {
  price: number;
  category: string;
};

export type CommentType = {
  comment: string;
};

export const zSeconds = z.object({
  _seconds: z.number(),
  _nanoseconds: z.number(),
});

export const zRecord = z.object({
  id: z.string(),
  price: z.number(),
  category: z.string(),
  createdAt: zSeconds,
  updatedAt: zSeconds,
});

export const zRecords = z.array(zRecord);

export type RecordType = z.infer<typeof zRecord>;
export type RecordsType = z.infer<typeof zRecords>;
export type SecondsType = z.infer<typeof zSeconds>;

export const zAuthBody = z.object({
  idToken: z.string(),
});

export type ChartDataType = {
  total: number;
  category: string[];
  expenses: number[];
};

export type RecordDocumentType = {
  price: number;
  category: string;
  createdAt: SecondsType;
  updatedAt: SecondsType;
};

export type AccumulatorInfoType = {
  total: number;
  category: string[];
  expenses: number[];
};

export type ExpensesByCategoryType = {
  expensesTotal: number;
  category: string[];
  expenses: number[];
};

export type ProfileType = {
  name: string;
  picture: string;
  email: string;
  comment: string;
};
