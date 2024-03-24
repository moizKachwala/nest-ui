import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActivitiesEditComponent from './ActivitiesEditPage';
import { getTitles, list, validate } from '../../../store/actions/chat';
import {create} from '../../../store/actions/activities';
import { getStudentByParent } from '../../../store/actions/students';
import { createSelector } from 'reselect';
import {getAssociatedId} from '../../../store/selectors/session';
import {selectStudents} from '../../../store/selectors/students';
import {createActivityTypeSelector} from '../../../store/selectors/activityTypes';
import {useParams} from 'react-router-dom';

export const ActivitiesEditPage = connect(
    () => {

        let { activityTypeId } = useParams();
        
        const selectActivityId = () => activityTypeId;

        const selectActivityType = createActivityTypeSelector(selectActivityId);

        const selectMode = (state) => state.chat.titles;
        const selectInitialValues = createSelector(
            selectMode,
            (mode) => {
                return {
                        title: '',
                        content: '',
                }
            }
        )

        return (state, props) => ({
            essayTitlesPending: state.chat.getTitle.pending,
            activityCreatePending: state.activities.create.pending,
            activityCreateError: state.activities.create.error,
            activityCreateErrorMessage: state.activities.create.errorMessage,
            titles: state.chat.titles,
            validations: state.chat.validations,
            initialValues: selectInitialValues(state, props),
            parentId: getAssociatedId(state, props), // we need it to get the associated student.
            students: selectStudents(state, props),
            activityType: selectActivityType(state, props),
        });
    },
    (dispatch, props) => ({
        actions: bindActionCreators({
            getTitles: getTitles,
            studentsGet: getStudentByParent,
            activityCreate: create,
        }, dispatch)
    })
)(ActivitiesEditComponent);