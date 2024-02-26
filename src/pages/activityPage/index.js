import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { createSelector } from 'reselect';

import ActivityPageComponent from './ActivityPage.js';
import { list } from '../../store/actions/activityTypes.js';
import {getAssociatedId} from '../../store/actions/session.js';
// import { selectLoginPending, selectLoginError, selectLoginErrorMessage } from '../../store/selectors/session';
// import { fromLocalStorage } from '../../utils/storage.js';

export const ActivityPage = connect(
    () => {
        // const selectInitialValues = createSelector(
        //     () => {
        //         return {
        //             username: '', //fromLocalStorage('username', null),
        //             password: '',
        //             rememberMe: fromLocalStorage('rememberMe', null) ? true : false,
        //             showPassword: false,
        //         }
        //     }
        // );
        return (state, props) => ({
            data: state.activityTypes.list,
            // getParentId: getAssociatedId(state, props),
            // loginPending: selectLoginPending(state),
            // loginError: selectLoginError(state),
            // loginErrorMessage: selectLoginErrorMessage(state),
            // initialValues: selectInitialValues(),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            activityTypesList: list
        }, dispatch)
    })
)(ActivityPageComponent);