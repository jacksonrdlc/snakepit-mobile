import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SocialType = 'google' | 'phone';

interface Props {
  style?: ViewStyle;
  type: SocialType;
  onPress: () => void;
  loading?: boolean;
  children: string;
}

function getSocialColor(type: SocialType): string {
  switch (type) {
    case 'google':
      return '#F96458';
    case 'phone':
      return '#b24292';
  }
}

function ProviderButton({style, type, onPress, loading, children}: Props) {
  return (
    <Button
      style={[styles.button, style]}
      icon={() => <Icon name={type} color="#fff" size={17} />}
      mode="contained"
      color={getSocialColor(type)}
      dark
      loading={loading}
      onPress={() => (loading ? null : onPress())}>
      {children}
    </Button>
  );
}

export default ProviderButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    width: 300,
  },
});
