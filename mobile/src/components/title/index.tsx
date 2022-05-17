import { Text } from 'react-native';
import global from '../../styles/global';
import styles from './styles';

interface ITitleProps {
  content: string;
}

export default function Title(props: ITitleProps) {
  let { content } = props;

  return <Text style={[global.bold, styles.content]}>{content}</Text>;
}
