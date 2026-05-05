import React, { useContext, useEffect, useState } from 'react';
import { usePatchProfile } from '../model/api/PatchProfileApi';
import type { IRegisterErrors } from '@/widgets/ui/RegisterForm/model/types';
import { Form } from '@/shared';
import { UserContext } from '@/app/Context/UserContext';
import {
  useDeleteLocalToken,
  useDeleteLocalUser,
} from '@/app/utils/user.utils';
import { useNavigate } from 'react-router-dom';
import type { IUserState } from '../model/types';

export const ProfileForm = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUserState>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    patronymic: user?.patronymic,
    email: user?.email || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        patronymic: user?.patronymic,
        email: user.email,
      });
    }
  }, [user]);

  const [avatar, setAvatar] = useState<FileList | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [localError, setLocalError] = useState<IRegisterErrors>({});
  const { mutate, error, isPending } = usePatchProfile(setIsEditable);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    avatar ? mutate({ ...formData, avatar: avatar[0] }) : mutate(formData);
  };

  const handleCancel = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      if (user) {
        setFormData({
          first_name: user.first_name,
          last_name: user.last_name,
          patronymic: user?.patronymic,
          email: user.email,
        });
      }
    }
  };

  const logout = () => {
    setUser(null);
    useDeleteLocalToken();
    useDeleteLocalUser();
    navigate('/login');
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
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: formData.first_name,
      onChange: handleChange,
      placeholder: 'Имя',
      readOnly: !isEditable,
    },
    {
      label: 'Фамилия',
      name: 'last_name',
      type: 'text',
      value: formData.last_name,
      onChange: handleChange,
      placeholder: 'Фамилия',
      readOnly: !isEditable,
    },
    {
      label: 'Отчество',
      name: 'patronymic',
      type: 'text',
      value: formData.patronymic,
      onChange: handleChange,
      placeholder: 'Отчество',
      readOnly: !isEditable,
    },
    {
      label: 'Почта',
      name: 'email',
      type: 'email',
      value: formData.email,
      onChange: handleChange,
      placeholder: 'Почта',
      error: localError?.email,
      readOnly: !isEditable,
    },
    {
      label: 'Аватар',
      name: 'avatar',
      type: 'file',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAvatar(e.target.files),
      placeholder: 'Аватар',
      disabled: !isEditable,
    },
  ];

  const submitButton = {
    value: 'Сохранить',
    disabled: isPending,
    type: 'submit',
    padding: '10px 15px',
    border: '3px solid gray',
    borderRadius: '10px',
  };

  const logoutButton = {
    value: 'Выйти',
    type: 'button',
    padding: '10px 15px',
    border: '3px solid gray',
    borderRadius: '10px',
    onClick: logout,
  };

  return (
    <Form
      multipleSelect={false}
      inputs={inputs}
      buttons={isEditable ? [submitButton] : [logoutButton]}
      onSubmit={handleSubmit}
    />
  );
};
