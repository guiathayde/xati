import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { SignIn } from '../pages/SignIn';
import { SignInCodePhoneNumber } from '../pages/SignInCodePhoneNumber';
import { Dashboard } from '../pages/Dashboard';

export function Routes() {
  return (
    <Switch>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/code-phone-number" element={<SignInCodePhoneNumber />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Switch>
  );
}
