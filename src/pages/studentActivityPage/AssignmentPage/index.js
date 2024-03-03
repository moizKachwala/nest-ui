import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssignmentComponent from './AssignmentPage';
import {get, submitAssignment} from '../../../store/actions/activities';
import {createActivitySelector} from '../../../store/selectors/activities';
import { createSelector } from 'reselect';
import {useParams} from 'react-router-dom';

export const AssignmentPage = connect(
    () => {
        let { activityId } = useParams();
        const selectActivityId = () => activityId;
        const selectAssignedActivity = createActivitySelector(selectActivityId);

        const selectMode = (state) => state.chat.titles;
        const selectInitialValues = createSelector(
            selectMode,
            (mode) => {
                return {
                        content: '',
                }
            }
        )

        return (state, props) => ({
            // essayTitlesPending: state.chat.getTitle.pending,
            validatePending: state.chat.validate.pending,
            validations: state.chat.validations,
            initialValues: selectInitialValues(state, props),
            assignedActivity: selectAssignedActivity(state, props),
            // activityId: selectActivityId(state, props),
        });
    },
    (dispatch, props) => ({
        actions: bindActionCreators({
            getActivity: get,
            submitAssignment: submitAssignment,
        }, dispatch)
    })
)(AssignmentComponent);