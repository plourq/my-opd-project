import type { IModelProps } from '../model/types';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

export const Modal = ({ children, isOpen, onClose }: IModelProps) => {
  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    throw new Error('Контейнер #modal-root не найден в DOM');
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
