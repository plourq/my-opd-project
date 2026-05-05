import React, { useEffect, useState } from 'react';
import { Form } from '@/shared/';
import type { IRegisterErrors, IRegisterUser } from '../model/types';
import { useRegisterUser } from '../model/api/RegisterApi';
import { useGetGroups } from '../../TestForm/model/api/getGroupsApi';
import type { IGroup } from '../../TestForm/model/types';

export const RegisterForm = () => {
  const [localError, setLocalError] = useState<IRegisterErrors>({});

  const [formData, setFormData] = useState<IRegisterUser>({
    first_name: '',
    last_name: '',
    patronymic: '',
    email: '',
    group: null,
    password: '',
    password2: '',
  });

  const [avatar, setAvatar] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data: groupsResponse, isLoading: groupsLoading } = useGetGroups();
  const { mutate: register, error, isPending } = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setLocalError({ password2: ['Пароли не совпадают'] });
    }
    if (formData.password.length < 8) {
      setLocalError({
        password: ['Пароль должен состоять минимум из 8 символов'],
      });
    }
    if (
      formData.password == formData.password2 &&
      formData.password.length >= 8
    ) {
      register(avatar ? { ...formData, avatar: avatar[0] } : formData);
    }
  };

  useEffect(() => {
    if (error) {
      setLocalError(error.errors);
    }
    const timer = setTimeout(() => {
      setLocalError({});
    }, 1500);

    return () => clearTimeout(timer);
  }, [error]);

  const inputs = [
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: formData.first_name,
      onChange: handleChange,
      placeholder: 'Имя',
      error: localError?.first_name,
    },
    {
      label: 'Фамилия',
      name: 'last_name',
      type: 'text',
      value: formData.last_name,
      onChange: handleChange,
      placeholder: 'Фамилия',
      error: localError?.last_name,
    },
    {
      label: 'Отчество',
      name: 'patronymic',
      type: 'text',
      value: formData.patronymic,
      onChange: handleChange,
      placeholder: 'Отчество',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: formData.email,
      onChange: handleChange,
      placeholder: 'Email',
      error: localError?.email,
    },
    {
      label: 'Группа',
      name: 'group',
      type: 'select',
      value: formData.group ?? '',
      disabled: groupsLoading,
      options: [
        { value: '', label: groupsLoading ? 'Загрузка...' : '--Выберите--' },
        ...(groupsResponse?.data?.map((group: IGroup) => ({
          value: group.id.toString(),
          label: group.title,
        })) || []),
      ],
      onChange: handleChange,
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: formData.password,
      onChange: handleChange,
      placeholder: 'Пароль',
      error: localError?.password,
    },
    {
      label: 'Повторите пароль',
      name: 'password2',
      type: 'password',
      value: formData.password2,
      onChange: handleChange,
      placeholder: 'Повторите пароль',
      error: localError?.password2,
    },
    {
      label: 'Avatar',
      name: 'avatar',
      type: 'file',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAvatar(e.target.files),
      placeholder: 'Avatar',
    },
  ];

  const button = {
    value: 'Отправить',
    disabled: isPending,
    type: 'submit',
    padding: '10px 15px',
    border: '3px solid gray',
    borderRadius: '10px',
  };

  return (
    <Form
      multipleSelect={false}
      inputs={inputs}
      onSubmit={handleSubmit}
      buttons={button}
    />
  );
};
