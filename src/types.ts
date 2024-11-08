export interface DataRecord {
  userId: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  decibels: number;
}

export interface OpenDataRecord {
  monitor: string;
  datetime: string;
  [key: string]: any;
}
