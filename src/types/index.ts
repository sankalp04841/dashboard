export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at?: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // levels for heatmap color intensity
}
