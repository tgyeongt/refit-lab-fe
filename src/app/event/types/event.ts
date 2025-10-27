export interface MockEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  dDay?: number;
  thumbnailUrl: string;
  isUpcoming?: boolean;
}
