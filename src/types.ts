export type Id = string | number;

export type ColumnType = {
  id: Id;
  type: string;
  widgets: NewWidget[];
  onDeleteWidget: (widgetId: Id) => void;
  onAddWidget: (columnId: Id, type: string) => void;
  onSetWidgets: React.Dispatch<React.SetStateAction<NewWidget[]>>;
};

export type NewWidget = {
  id: Id;
  type: string;
  columnId: Id;
  settings: WidgetSettings;
};

export type WidgetSettings = {
  city?: string;
  noteValue?: string;
  currencyValue?: string;
};
// export type WeatherSettings = {
//   city: string;
// };
// export type NoteSettings = {
//   value: string;
// };
