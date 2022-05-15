import TextInput, { ITextInputProps } from '../textInput';

export default function NumericInput(props: ITextInputProps) {
  return <TextInput {...props} keyboardType='numeric' />
}
