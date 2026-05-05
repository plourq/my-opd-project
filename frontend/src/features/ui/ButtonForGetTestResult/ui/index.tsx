import { useParams } from 'react-router-dom';
import { useGetTestResult } from '../model/api/getTestResultApi';
import type { IProps } from '../model/types';
import { Button } from '@/shared';
import { useState } from 'react';
import styles from './ButtonForGetTestResult.module.scss';

export const ButtonForGetTestResult = ({ setTestResultData }: IProps) => {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(false);

  const { data, refetch } = useGetTestResult(Number(id), enabled);

  const handleSubmit = async () => {
    setEnabled(true);
    const result = await refetch();
    setTestResultData(result.data?.data);
    setEnabled(false);
  };

  const button = {
    value: 'Завершить тест',
    onClick: handleSubmit,
    padding: '10px 15px',
    border: 'solid gray 3px',
    borderRadius: '10px',
    className: styles.result_button,
    bgc: 'green',
  };

  return <Button button={button} />;
};
