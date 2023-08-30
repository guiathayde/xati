import React from 'react';
import auth from '@react-native-firebase/auth';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

export const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
      />
    </SafeAreaView>
  );
};
