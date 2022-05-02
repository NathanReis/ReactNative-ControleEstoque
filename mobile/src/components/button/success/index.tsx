import { GestureResponderEvent } from 'react-native';
import Button from '..';
import colors from '../../../styles/colors';

interface ISuccessButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function SuccessButton(props: ISuccessButtonProps) {
  let { title, onPress } = props;

  return <Button
    colors={{
      background: colors.success.background,
      text: colors.success.text
    }}
    title={title}
    onPress={onPress}
  />;
}
