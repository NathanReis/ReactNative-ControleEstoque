import { GestureResponderEvent } from 'react-native';
import Button from '..';
import colors from '../../../styles/colors';

interface IInfoButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function InfoButton(props: IInfoButtonProps) {
  let { title, onPress } = props;

  return <Button
    colors={{
      background: colors.info.background,
      text: colors.info.text
    }}
    title={title}
    onPress={onPress}
  />;
}
