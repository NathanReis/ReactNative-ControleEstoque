import { GestureResponderEvent } from 'react-native';
import Button from '..';
import colors from '../../../styles/colors';

interface IDangerButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function DangerButton(props: IDangerButtonProps) {
  let { title, onPress } = props;

  return <Button
    colors={{
      background: colors.danger.background,
      text: colors.danger.text
    }}
    title={title}
    onPress={onPress}
  />;
}
