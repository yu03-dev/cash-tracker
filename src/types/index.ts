import { z } from "zod";

export const zPostData = z.object({
  price: z.number(),
  category: z.string(),
});

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

export const zChartData = z.object({
  expensesTotal: z.number(),
  categories: z.array(z.string()),
  expenses: z.array(z.number()),
});

export const zProfileData = z.object({
  name: z.string(),
  picture: z.string(),
  email: z.string(),
  comment: z.string(),
});

export const zIdToken = z.object({
  idToken: z.string(),
});

export const zMessageResponse = z.object({
  message: z.string(),
});

export type PostDataType = z.infer<typeof zPostData>;
export type SecondsType = z.infer<typeof zSeconds>;
export type RecordType = z.infer<typeof zRecord>;
export type RecordsType = z.infer<typeof zRecords>;
export type ChartDataType = z.infer<typeof zChartData>;
export type ProfileDataType = z.infer<typeof zProfileData>;
export type MessageRessponseType = z.infer<typeof zMessageResponse>;
