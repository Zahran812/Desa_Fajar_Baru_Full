export interface Comment {
  id: number;
  content: string;
  created_at: string;
  citizen: {
    id: number;
    full_name: string;
  };
}
