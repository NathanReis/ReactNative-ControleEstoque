import { FontAwesome } from '@expo/vector-icons';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../styles/colors';
import global from '../../styles/global';
import sizes from '../../styles/sizes';
import styles from './styles';

interface IListItemProps {
  handleEdit?: (event: GestureResponderEvent) => void;
  handleRemove?: (event: GestureResponderEvent) => void;
  mainContent: string;
  secondaryContents?: string[];
}

export default function ListItem(props: IListItemProps) {
  let { handleEdit, handleRemove, mainContent, secondaryContents } = props;

  return (
    <View style={styles.container}>
      <View>
        <Text key={-1} style={[global.bold, styles.mainContent]}>{mainContent}</Text>

        {secondaryContents?.map((content, index) => <Text key={index} style={styles.secondaryContent}>{content}</Text>)}
      </View>
      <View style={styles.actionsContainer}>
        {
          handleEdit
          && (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={handleEdit}
            >
              <FontAwesome
                color={colors.warning.text}
                name='edit'
                size={sizes.listItemButton.icon}
              />
            </TouchableOpacity>
          )
        }
        {
          handleRemove
          && (
            <TouchableOpacity
              style={[styles.button, styles.removeButton]}
              onPress={handleRemove}
            >
              <FontAwesome
                color={colors.danger.text}
                name='trash'
                size={sizes.listItemButton.icon}
              />
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}
