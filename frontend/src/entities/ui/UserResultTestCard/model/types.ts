import type { IResult } from '@/widgets/ui/GroupTestResults/model/types';

export type IProps = Omit<IResult, 'user_id'>;
