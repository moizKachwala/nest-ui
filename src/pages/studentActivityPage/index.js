import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { createSelector } from 'reselect';

import StudentActivityPageComponent from './StudentActivityPage.js';
import { getActivitiesByStudent } from '../../store/actions/activities.js';
import {getAssociatedId} from '../../store/selectors/session';
// import { selectLoginPending, selectLoginError, selectLoginErrorMessage } from '../../store/selectors/session';
// import { fromLocalStorage } from '../../utils/storage.js';

export const StudentActivityPage = connect(
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
            data: state.activities.data,
            studentId: getAssociatedId(state, props),
            // getParentId: getAssociatedId(state, props),
            // loginPending: selectLoginPending(state),
            // loginError: selectLoginError(state),
            // loginErrorMessage: selectLoginErrorMessage(state),
            // initialValues: selectInitialValues(),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            getActivities: getActivitiesByStudent,
        }, dispatch)
    })
)(StudentActivityPageComponent);