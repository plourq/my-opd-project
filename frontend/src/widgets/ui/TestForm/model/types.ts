export interface ITestCreate {
  title: string;
  questions: number[];
  available_groups?: number[];
}

export interface ITestErrors {
  title?: string | string[];
  questions?: string | string[];
  available_groups?: string | string[];
}

export interface IGroup {
  id: number;
  title: string;
}

export interface IFormData {
  title: string;
  availableGroups: [];
}
