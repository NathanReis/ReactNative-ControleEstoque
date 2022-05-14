import { Text } from 'react-native';
import styles from './styles';

interface ITitleProps {
  content: string;
}

export default function Title(props: ITitleProps) {
  let { content } = props;

  return <Text style={styles.content}>{content}</Text>;
}
