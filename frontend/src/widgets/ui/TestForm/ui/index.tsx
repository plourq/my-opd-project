import { Form } from '@/shared';
import { useState } from 'react';
import { QuestionForm } from '../../QuestionForm';
import type { IGetQuestions } from '../../QuestionForm/model/types';
import { useCreateTest } from '../model/api/testCreateApi';
import type { IFormData, IGroup } from '../model/types';
import { useGetGroups } from '../model/api/getGroupsApi';

export const TestForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    availableGroups: [],
  });
  const [questions, setQuestions] = useState<IGetQuestions[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { data: groupsResponse, isLoading: groupsLoading } = useGetGroups();

  const inputs = [
    {
      value: formData.title,
      label: 'Введите название теста',
      type: 'text' as const,
      name: 'title',
      placeholder: 'название теста',
      onChange: handleChange,
    },
    {
      value: formData.availableGroups,
      type: 'select' as const,
      name: 'availableGroups',
      label: 'Доступные группы',
      onChange: handleChange,
      disabled: groupsLoading,
      options: [
        ...(groupsResponse?.data?.map((group: IGroup) => ({
          value: group.id.toString(),
          label: group.title,
        })) || []),
      ],
    },
  ];

  const { mutate, isPending } = useCreateTest(setQuestions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length > 0) {
      const questionIds = questions.map(q => Number(q.id));
      mutate({
        title: formData.title,
        available_groups: [...formData.availableGroups],
        questions: questionIds,
      });
    }
  };

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
      <Form
        anotherForm={
          <QuestionForm questions={questions} setQuestions={setQuestions} />
        }
        multipleSelect={true}
        inputs={inputs}
        buttons={[button]}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
