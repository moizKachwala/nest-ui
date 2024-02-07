import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import LoginPageComponent from './LoginPage.js';
import { login } from '../../store/actions/session';
import { selectLoginPending, selectLoginError, selectLoginErrorMessage } from '../../store/selectors/session';
import { fromLocalStorage } from '../../utils/storage.js';

export const LoginPage = connect(
    () => {
        const selectInitialValues = createSelector(
            () => {
                return {
                    username: 'admin',//fromLocalStorage('username', null),
                    password: "password",
                    rememberMe: fromLocalStorage('rememberMe', null) ? true : false,
                    showPassword: false,
                }
            }
        );
        return (state) => ({
            loginPending: selectLoginPending(state),
            loginError: selectLoginError(state),
            loginErrorMessage: selectLoginErrorMessage(state),
            initialValues: selectInitialValues(),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            sessionLogin: login
        }, dispatch)
    })
)(LoginPageComponent);