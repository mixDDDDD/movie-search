import styles from './Paragraph.module.css';

type ParagraphProps = {
  children: React.ReactNode;
};

function Paragraph({ children }: ParagraphProps) {
  return <p className={styles.paragraph}>{children}</p>;
}

export default Paragraph;