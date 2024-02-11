import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { logout } from '../../store/actions/session'; // Import your logout action

const Logout = () => {
  const hasAuthToken = useSelector(state => Boolean(state.session.authToken));
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the logout action when the component mounts
    dispatch(logout(true));
  }, [dispatch]);

  return !hasAuthToken ?? <Route path="/logout" element={<Navigate to="/auth/login" replace />} />
};

export default Logout;
