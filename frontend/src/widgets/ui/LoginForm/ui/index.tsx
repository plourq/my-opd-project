import React, { useEffect, useState } from 'react';
import { useLoginUser } from '../model/api/LoginApi';
import { Form } from '@/shared';
import type { ILoginErrors } from '../model/types';

export const LoginForm = () => {
  const [localError, setLocalError] = useState<ILoginErrors>({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: register, error, isPending } = useLoginUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
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

  const inputs = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: formData.email,
      onChange: handleChange,
      placeholder: 'Email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: formData.password,
      onChange: handleChange,
      placeholder: 'Password',
      error: localError.error,
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
