import React from "react";
import styles from "./ErrorModal.module.css";
import Button from "./Button/Button.js";
import Card from "./Card.js";

interface ErrorModalProps {
  title: string;
  message: string;
  onConfirmError: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ title, message, onConfirmError }) => {
  return (
    <div className={styles.backdrop} onClick={onConfirmError}>
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{title}</h2>
        </header>
        <div className={styles.content}>
          <p>{message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={onConfirmError}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
