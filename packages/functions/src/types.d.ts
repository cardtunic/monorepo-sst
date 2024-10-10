interface WebhookPayload {
  event: string;
  history_items: HistoryItem;
  task_id: string;
  webhook_id: string;
}

interface HistoryItem {
  id: string;
  type: number;
  date: string;
  field: string;
  parent_id: string;
  data: {
    status_type: string;
  };
  source: null;
  user: User;
  before: StatusInfo;
  after: StatusInfo;
}

interface User {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture: string | null;
}

interface StatusInfo {
  status: string;
  color: string;
  orderindex: number;
  type: string;
}
