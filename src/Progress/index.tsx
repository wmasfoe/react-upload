import styles from './styles.module.scss'

interface ProgressProps {
  scale: number,
  bgColor?: string
}

const Progress = (props: ProgressProps) => {

  const { scale, bgColor } = props
  return <div className={styles.wrapper}>
    <div className={styles.bar} style={{
      width: `${scale * 100}%`,
      backgroundColor: bgColor
    }} />
  </div>;
}

export default Progress
