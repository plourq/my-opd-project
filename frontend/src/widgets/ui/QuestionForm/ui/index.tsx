import { AddQuestionButton } from '@/features/';
import { Form } from '@/shared';
import React, { useEffect, useState } from 'react';
import type {
  IFormField,
  IGetQuestions,
  IQuestionFormData,
  IQuestionFormDataErrors,
  IQuestionFormProps,
} from '../model/types';
import { useCreateQuestion } from '../model/api/CreateQuestionApi';
import type { IResponse } from '@/app/constants/types';
import { QuestionCard } from '@/entities';
import styles from './QuestionForm.module.scss';
import { Modal } from '@/shared/';

export const QuestionForm = ({
  questions,
  setQuestions,
}: IQuestionFormProps) => {
  const [formData, setFormData] = useState<IQuestionFormData>({
    text: '',
    question_type: '',
    choices: '',
    matching_pairs: '',
    correct_answer: '',
  });
  const [image, setImage] = useState<FileList | null>(null);
  const [localError, setLocalError] = useState<IQuestionFormDataErrors>({});
  const [firstValues, setFirstValues] = useState('');
  const [secondValues, setSecondValues] = useState('');

  const addQuestion = (newQuestion: IResponse<IGetQuestions>) => {
    setQuestions(prev => [...prev, newQuestion.data]);
    setFormData({
      text: '',
      question_type: '',
      choices: '',
      matching_pairs: '',
      correct_answer: '',
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { mutate, error, isPending } = useCreateQuestion(addQuestion);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (error) {
      setLocalError(error.errors);

      const timer = setTimeout(() => {
        setLocalError({});
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mutate(image ? { ...formData, image: image[0] } : formData);
    closeModal();
  };

  console.log(formData.matching_pairs);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      matching_pairs: `${firstValues}:${secondValues}`,
    }));
  }, [firstValues, secondValues]);

  const inputs: IFormField[] = [
    {
      label: 'Изображение',
      name: 'image',
      type: 'file',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setImage(e.target.files),
    },
    {
      label: 'Текст вопроса',
      name: 'text',
      type: 'text',
      value: formData.text,
      onChange: handleChange,
      placeholder: 'Вопрос',
      required: true,
    },
    {
      label: 'Тип вопроса',
      name: 'question_type',
      type: 'select',
      value: formData.question_type,
      onChange: handleChange,
      options: [
        { value: '', label: '--Выберите--' },
        { value: 'choice', label: 'Варианты ответа' },
        { value: 'text', label: 'Свободный ответ' },
        { value: 'matching', label: 'Сопоставление' },
      ],
      error: localError.question_type,
    },
    {
      label: 'Правильный ответ',
      name: 'correct_answer',
      type: 'text',
      value: formData.correct_answer,
      onChange: handleChange,
      placeholder: 'Правильный ответ',
      required: true,
    },
  ];

  if (formData.question_type === 'choice') {
    inputs.push({
      label: 'Перечислите варианты через |, например: Москва|Париж|Лондон',
      name: 'choices',
      type: 'text',
      value: formData.choices,
      onChange: handleChange,
      placeholder: 'Варианты ответа',
    });
  } else if (formData.question_type === 'matching') {
    inputs.push({
      label: 'Первые значения для сопоставления через |',
      name: 'matching_pairs',
      type: 'text',
      value: formData.matching_pairs?.split(':')[0],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFirstValues(e.target.value),
      placeholder: 'Введите первые значения',
    });
    inputs.push({
      label: 'Вторые значения для сопоставления через |',
      name: 'matching_pairs',
      type: 'text',
      value: formData.matching_pairs?.split(':')[1],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSecondValues(e.target.value),
      placeholder: 'Введите вторые значения',
    });
  }

  const button = {
    value: 'Отправить',
    type: 'submit',
    padding: '10px 15px',
    border: '3px solid gray',
    borderRadius: '10px',
    disabled: isPending,
  };

  return (
    <div>
      <div className={styles.questions}>
        {questions?.length > 0 &&
          questions.map((el, index) => (
            <QuestionCard text={el.text} index={index} />
          ))}
        <AddQuestionButton openModal={openModal} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Form
          multipleSelect={false}
          inputs={inputs}
          onSubmit={handleSubmit}
          buttons={button}
        />
      </Modal>
    </div>
  );
};
