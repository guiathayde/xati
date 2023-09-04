import { AuthNativeStackNavigatorProps } from '../routes/auth';
import { AppNativeStackNavigatorProps } from '../routes/app';

declare global {
  namespace ReactNavigation {
    export interface RootParamList
      extends AuthNativeStackNavigatorProps,
        AppNativeStackNavigatorProps {}
  }
}
