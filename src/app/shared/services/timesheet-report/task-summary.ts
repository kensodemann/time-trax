import { Stage } from '../../../data/models/stage';

export interface TaskSummary {
  name: string;
  stage?: Stage;
  milliseconds: number;
}
