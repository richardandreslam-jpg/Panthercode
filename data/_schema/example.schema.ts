import { z } from "zod";

export const exampleRecordSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  data: z.record(z.unknown()),
});

export const exampleInputSchema = exampleRecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ExampleRecord = z.infer<typeof exampleRecordSchema>;
