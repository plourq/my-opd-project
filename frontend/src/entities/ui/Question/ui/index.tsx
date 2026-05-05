import { IMG_BASE_URL } from '@/app/constants/constants';
import styles from './Question.module.scss';
import { Button, Input, Radio } from '@/shared';
import { useEffect, useState } from 'react';
import { usePostAnswerApi } from '../model/api/postAnswerApi';
import type { IQuestionProps } from '../model/types';
import { MatchingPairs } from '../../MatchingPairs';

export const Question = ({
  text,
  choices,
  matching_pairs,
  image,
  question_type,
  testId,
  questionId,
}: IQuestionProps) => {
  const [answer, setAnswer] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');

  const { mutate, isPending } = usePostAnswerApi();
  const [successAnswer, setSuccessAnswer] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let dataToSend = { user_answer: '' };

    if (question_type === 'choice') {
      dataToSend = { user_answer: selectedChoice };
    } else if (question_type === 'text') {
      dataToSend = { user_answer: answer };
    } else if (question_type === 'matching') {
      dataToSend = { user_answer: answer };
    }

    mutate(
      {
        body: dataToSend,
        testId: testId ? testId.toString() : '',
        questionId: questionId ? questionId.toString() : '',
      },
      {
        onSuccess: () => {
          setSuccessAnswer(true);
        },
      }
    );
  };

  const handleChoiceSelect = (value: string) => {
    setSelectedChoice(value);
    setAnswer(value);
  };

  useEffect(() => {
    setAnswer('');
    setSelectedChoice('');
    setSuccessAnswer(false);
  }, [questionId]);

  const button = {
    value: 'Отправить',
    disabled: isPending,
    type: 'submit',
    padding: '10px 15px',
    border: '3px solid gray',
    borderRadius: '10px',
  };

  console.log(answer);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.text}>{text}</h2>

      {image && (
        <img
          className={styles.img}
          src={`${IMG_BASE_URL}${image}`}
          alt="image"
        />
      )}

      {question_type === 'choice' && choices ? (
        <div>
          {choices.split('|').map((el, index) => (
            <div key={index}>
              <Radio
                name="choices"
                value={el}
                label={el}
                checked={selectedChoice === el}
                onChange={() => handleChoiceSelect(el)}
              />
            </div>
          ))}
        </div>
      ) : question_type === 'matching' && matching_pairs ? (
        <div>
          <MatchingPairs
            matching_pairs={matching_pairs}
            setAnswer={setAnswer}
          />
        </div>
      ) : question_type === 'text' ? (
        <Input
          label="Ваш ответ"
          placeholder="Ответ"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
      ) : null}
      <Button button={button} />
      {successAnswer && (
        <span className={styles.success_answer}>Ваш ответ записан</span>
      )}
    </form>
  );
};
