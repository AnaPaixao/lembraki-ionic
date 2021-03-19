export class Deck {
  id: string;
  name: string;
  color: string;
  direction: 'term' | 'definition' | '';
  in_progress: boolean;
  progress: number;
  archived: boolean;
  created_at: any;
  updated_at: any;
}
