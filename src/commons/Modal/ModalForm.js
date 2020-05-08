import { useContext } from 'react';
import { ModalContext } from '../../contexts/modal';

export default function ModalForm() {
  const [{ isOpen, component }] = useContext(ModalContext);
  return isOpen ? component : null;
}
