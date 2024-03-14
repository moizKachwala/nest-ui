import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { createSelector } from 'reselect';

import StudentDetailsPageComponent from './StudentDetailsPage.js';
import { getByStudent } from '../../../store/actions/activityAssignments.js';
// import {getAssociatedId} from '../../store/selectors/session';
// import { selectLoginPending, selectLoginError, selectLoginErrorMessage } from '../../store/selectors/session';
// import { fromLocalStorage } from '../../utils/storage.js';

export const StudentDetailsPage = connect(
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
            data: state.activityAssignments.data,
            // studentId: getAssociatedId(state, props),
            // getParentId: getAssociatedId(state, props),
            activityAssignmentsPending: state.activityAssignments.get.pending,
            activityAssignmentsError: state.activityAssignments.get.error,
            activityAssignmentsErrorMessage: state.activityAssignments.get.errorMessage,
            // initialValues: selectInitialValues(),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            getActivities: getByStudent,
        }, dispatch)
    })
)(StudentDetailsPageComponent);