import { Question } from '@/entities';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetTestTitleApi } from '../model/api/getTestTitleApi';
import styles from './OneTestPage.module.scss';
import { useGetQuestionApi } from '../model/api/getQuestionApi';
import { SwipeQuestionButton } from '@/features';
import { useContext, useEffect, useState } from 'react';
import type { IGetTestResult } from '@/features/ui/ButtonForGetTestResult/model/types';
import { ButtonForGetTestResult } from '@/features/';
import { TestResultPage } from '../../TestResultPage';
import { useGetTestResult } from '@/features/ui/ButtonForGetTestResult/model/api/getTestResultApi';
import { UserContext } from '@/app/Context/UserContext';
import { AdminChangeTest } from '@/widgets';

export const OneTestPage = () => {
  const { id: testId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get('q');
  const [testResultData, setTestResultData] = useState<IGetTestResult>();

  const { data: testResultDataFetch } = useGetTestResult(Number(testId), true);

  const { data: testData } = useGetTestTitleApi(testId ? testId : '');

  const { user } = useContext(UserContext);

  const questionsQuantity = testData?.data?.questions_quantity || 0;

  const { data: question } = useGetQuestionApi(
    testId || '',
    questionId || '1',
    questionsQuantity
  );

  useEffect(() => {
    setTestResultData(testResultDataFetch?.data);
  }, [testResultDataFetch]);

  return (
    <>
      {user?.is_staff ? (
        <AdminChangeTest />
      ) : testResultData?.answer_count == 0 ? (
        <div className={styles.questions}>
          <h1 className={styles.title}>{testData?.data?.title}</h1>
          <div className={styles.question_swipe}>
            {questionsQuantity == 0 ? (
              <h1 className={styles.no_questions}>В тесте нет вопросов</h1>
            ) : (
              <>
                <div
                  className={`${styles.left_arrow} ${Number(questionId) === 1 ? styles.hidden : ''}`}
                >
                  <SwipeQuestionButton prev={true} />
                </div>
                <Question
                  text={question?.data.text}
                  image={question?.data.image}
                  choices={question?.data.choices}
                  matching_pairs={question?.data.matching_pairs}
                  correct_answer={question?.data.correct_answer}
                  question_type={question?.data.question_type}
                  testId={testId?.toString() || undefined}
                  questionId={questionId?.toString() || undefined}
                />
                <div
                  className={`${styles.right_arrow} ${Number(questionId) == questionsQuantity || questionsQuantity == 0 ? styles.hidden : ''}`}
                >
                  <SwipeQuestionButton prev={false} />
                </div>
              </>
            )}
          </div>
          {Number(questionId) == Number(questionsQuantity) && (
            <ButtonForGetTestResult setTestResultData={setTestResultData} />
          )}
        </div>
      ) : (
        <TestResultPage
          testTitle={testData?.data?.title}
          scorePercentage={testResultData?.score_percentage}
        />
      )}
    </>
  );
};
