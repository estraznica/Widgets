export type Id = string | number;

export type ColumnType = {
  id: Id;
  type: string;
};

export type NewWidget = {
  id: Id;
  type: string;
  columnId: Id;
};
