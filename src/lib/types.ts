export interface CollectionMeta {
  version: number;
  lastModified: string;
  description?: string | undefined;
}

export interface CollectionFile<T> {
  _meta: CollectionMeta;
  records: T[];
}

export interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}
