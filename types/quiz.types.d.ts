
export declare type QuizConfig = {
  quizId: number;
  basePath: string;
  fields: ('email' | 'group' | 'name' )[];
  order: 'asc' | 'desc' | 'random';
  timeLimit?: string;
};
