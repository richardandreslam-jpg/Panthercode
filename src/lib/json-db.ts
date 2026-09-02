import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z, type ZodType } from "zod";
import type { BaseRecord, CollectionFile } from "./types";
import { collectionId, getDataDirectory } from "./utils";

const collectionNameSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const collectionFileSchema = z.object({
  _meta: z.object({
    version: z.number(),
    lastModified: z.string(),
    description: z.string().optional(),
  }),
  records: z.array(z.unknown()),
});

const locks = new Map<string, Promise<void>>();
const schemas = new Map<string, ZodType<unknown>>();

export const registerSchema = <T>(collection: string, schema: ZodType<T>): void => {
  schemas.set(collection, schema as ZodType<unknown>);
};

const getCollectionPath = (collection: string): string => {
  collectionNameSchema.parse(collection);
  return path.resolve(getDataDirectory(), `${collection}.json`);
};

const getBackupDirectory = (): string => path.resolve(getDataDirectory(), "_backups");

const withLock = async <T>(collection: string, operation: () => Promise<T>): Promise<T> => {
  const previous = locks.get(collection) ?? Promise.resolve();
  let release: () => void = () => undefined;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  locks.set(collection, current);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (locks.get(collection) === current) locks.delete(collection);
  }
};

const validateRecord = <T>(collection: string, record: T): T => {
  const schema = schemas.get(collection);
  return schema ? (schema.parse(record) as T) : record;
};

const readCollection = async <T>(collection: string): Promise<CollectionFile<T>> => {
  const file = await readFile(getCollectionPath(collection), "utf8");
  const parsed = collectionFileSchema.parse(JSON.parse(file));
  return {
    _meta: parsed._meta,
    records: parsed.records.map((record) => validateRecord(collection, record as T)),
  };
};

const writeCollection = async <T>(collection: string, collectionFile: CollectionFile<T>): Promise<void> => {
  const filePath = getCollectionPath(collection);
  await mkdir(path.dirname(filePath), { recursive: true });
  await mkdir(getBackupDirectory(), { recursive: true });
  try {
    await copyFile(filePath, path.join(getBackupDirectory(), `${collection}.json`));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  await writeFile(filePath, `${JSON.stringify(collectionFile, null, 2)}\n`, "utf8");
};

const now = (): string => new Date().toISOString();

export const jsonDb = {
  async getAll<T>(collection: string): Promise<T[]> {
    const file = await readCollection<T>(collection);
    return file.records;
  },

  async getById<T extends BaseRecord>(collection: string, id: string): Promise<T | null> {
    const records = await this.getAll<T>(collection);
    return records.find((record) => record.id === id) ?? null;
  },

  async create<T extends BaseRecord>(collection: string, data: Omit<T, keyof BaseRecord>): Promise<T> {
    return withLock(collection, async () => {
      const file = await readCollection<T>(collection);
      const timestamp = now();
      const record = validateRecord(collection, {
        ...data,
        id: collectionId(collection),
        createdAt: timestamp,
        updatedAt: timestamp,
      } as T);
      file.records.push(record);
      file._meta.lastModified = timestamp;
      await writeCollection(collection, file);
      return record;
    });
  },

  async update<T extends BaseRecord>(collection: string, id: string, partial: Partial<T>): Promise<T> {
    return withLock(collection, async () => {
      const file = await readCollection<T>(collection);
      const index = file.records.findIndex((record) => record.id === id);
      if (index < 0) throw new Error(`Record not found: ${id}`);
      const current = file.records[index];
      if (!current) throw new Error(`Record not found: ${id}`);
      const updated = validateRecord(collection, { ...current, ...partial, id, updatedAt: now() } as T);
      file.records[index] = updated;
      file._meta.lastModified = updated.updatedAt;
      await writeCollection(collection, file);
      return updated;
    });
  },

  async remove(collection: string, id: string): Promise<boolean> {
    return withLock(collection, async () => {
      const file = await readCollection<BaseRecord>(collection);
      const nextRecords = file.records.filter((record) => record.id !== id);
      if (nextRecords.length === file.records.length) return false;
      file.records = nextRecords;
      file._meta.lastModified = now();
      await writeCollection(collection, file);
      return true;
    });
  },

  async query<T>(collection: string, filter: (item: T) => boolean): Promise<T[]> {
    return (await this.getAll<T>(collection)).filter(filter);
  },
};

registerSchema("example", z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  data: z.record(z.unknown()),
}));
