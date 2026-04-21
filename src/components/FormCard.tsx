import { View, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import CustomTextInput from './CustomTextInput';
import CustomActivity from './CustomActivity';

interface FormCardProps {
  onSubmit?: (value: string) => void;
  title?: string;
}

// Composite component that combines CustomTextInput and CustomActivity
const FormCard: FC<FormCardProps> = ({ onSubmit, title = 'Submit' }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handlePress = () => {
    if (onSubmit) {
      onSubmit(inputValue);
    }
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        label={title}
        placeholder="Enter text..."
        value={inputValue}
        onChangeText={setInputValue}
      />
      <CustomActivity
        title={title}
        onPress={handlePress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default FormCard;
