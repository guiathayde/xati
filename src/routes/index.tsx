import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { AuthRoutes } from './auth';
import { AppRoutes } from './app';

import { useAuth } from '../hooks/auth';

export const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#377DFF" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
