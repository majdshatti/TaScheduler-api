export type langType = {
  ar: string;
  en: string;
};

export type errorSentances = {
  special: string;
  required: string;
  email: string;
  number: string;
  zip: string;
  unique: string;
  minLength: string;
  maxLength: string;
  boolean: string;
  date: string;
  string: string;
  betweenLength: string;
  credentials: string;
  exist: string;
  operation: string;
  statusSame: string;
  serverError: string;
  auth: string;
  extraFields: string;
};

export type successSentances = {
  create: string;
  edit: string;
  delete: string;
};

export type langTerms = {
  name: string;
  description: string;
  id: string;
  username: string;
  slug: string;
  project: string;
  task: string;
  user: string;
};
