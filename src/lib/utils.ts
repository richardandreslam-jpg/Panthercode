export const getDataDirectory = (): string => {
  const configuredDirectory = process.env.DATA_DIR;
  return configuredDirectory ? configuredDirectory : "data";
};

export const collectionId = (collection: string): string =>
  `${collection.replace(/[^a-z0-9-]/gi, "-")}_${crypto.randomUUID()}`;
