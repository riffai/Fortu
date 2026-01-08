export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  GUEST = 'GUEST'
}

export interface TrafficData {
  time: string;
  in: number;
  out: number;
  occupancy: number;
}

export interface ZoneRanking {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'flat';
}

export interface CSIMetric {
  label: string;
  score: number; // 0-100
  color: string;
}

export enum TimeRange {
  TODAY = 'Today',
  WEEK = 'This Week',
  MONTH = 'This Month'
}