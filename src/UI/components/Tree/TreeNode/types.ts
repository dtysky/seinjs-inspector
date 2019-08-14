export interface ITreeData {
  text: string;
  id: number;
  type?: string;
  children?: Array<ITreeData>;
}
