import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { SignIn } from '../pages/SignIn';
import { Profile } from '../pages/Profile';
import { Dashboard } from '../pages/Dashboard';
import { AddUser } from '../pages/AddUser';
import { Chat } from '../pages/Chat';

export function Routes() {
  return (
    <Switch>
      <Route path="/signin" element={<SignIn />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      <Route path="/profile" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* <Route path="/profile" element={<Profile />} /> */}

      <Route path="/add-user" element={<PrivateRoute />}>
        <Route path="/add-user" element={<AddUser />} />
      </Route>
      {/* <Route path="/add-user" element={<AddUser />} /> */}

      <Route path="/chat/:id" element={<PrivateRoute />}>
        <Route path="/chat/:id" element={<Chat />} />
      </Route>
      {/* <Route path="/chat/:id" element={<Chat />} /> */}

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Switch>
  );
}
