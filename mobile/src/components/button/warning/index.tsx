import { GestureResponderEvent } from 'react-native';
import Button from '..';
import colors from '../../../styles/colors';

interface IWarningButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function WarningButton(props: IWarningButtonProps) {
  let { title, onPress } = props;

  return <Button
    colors={{
      background: colors.warning.background,
      text: colors.warning.text
    }}
    title={title}
    onPress={onPress}
  />;
}
