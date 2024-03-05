import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssignmentComponent from './AssignmentPage';
import {get, submit} from '../../../store/actions/activityAssignments';
import {selectedActivity} from '../../../store/selectors/activityAssignments';
import { createSelector } from 'reselect';
import {useParams} from 'react-router-dom';

export const AssignmentPage = connect(
    () => {
        let { activityAssignmentId } = useParams();
        console.log('activityAssignmentId', {activityAssignmentId});
        const selectActivityId = () => activityAssignmentId;

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
            assignedActivity: selectedActivity(state, props),
            activityId: selectActivityId(state, props),
        });
    },
    (dispatch, props) => ({
        actions: bindActionCreators({
            getAssignedActivityById: get,
            submitAssignment: submit,
        }, dispatch)
    })
)(AssignmentComponent);