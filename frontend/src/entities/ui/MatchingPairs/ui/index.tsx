import { type ChangeEvent } from 'react';
import type { IProps } from '../model/types';
import styles from './MatchingPairs.module.scss';
import { Select } from '@/shared';

export const MatchingPairs = ({ matching_pairs, setAnswer }: IProps) => {
  const firstValues = matching_pairs.split(':')[0].split('|');
  const secondValues = matching_pairs.split(':')[1].split('|');

  const changeAnswer = (el: string, e: ChangeEvent<HTMLSelectElement>) => {
    setAnswer(prev => {
      const pairs = prev ? prev.split(';') : [];

      const existingIndex = pairs.findIndex(pair => pair.startsWith(`${el}:`));

      const newPair = `${el}:${e.target.value}`;

      if (existingIndex !== -1) {
        pairs[existingIndex] = newPair;
      } else {
        pairs.push(newPair);
      }

      return pairs.join(';');
    });
  };

  return (
    <div className={styles.matching_pairs}>
      {firstValues &&
        firstValues?.map(el => (
          <div className={styles.pair}>
            <p>{el}</p>
            <Select
              options={[
                { value: '', label: '--Выберите--' },
                ...(secondValues?.map(el => ({
                  value: el,
                  label: el,
                })) || []),
              ]}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                changeAnswer(el, e)
              }
            />
          </div>
        ))}
    </div>
  );
};
