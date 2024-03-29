import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EssayComponent from './EssayPage';
import { getTitles, list, validate } from '../../store/actions/chat';
import {create} from '../../store/actions/activities';
import { getStudentByParent } from '../../store/actions/students';
import { createSelector } from 'reselect';
import {getAssociatedId} from '../../store/selectors/session';
import {selectStudents} from '../../store/selectors/students';

export const EssayPage = connect(
    () => {

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
            // activityCreatePending: state.activitvalidate.pending,
            titles: state.chat.titles,
            validations: state.chat.validations,
            initialValues: selectInitialValues(state, props),
            getParentId: getAssociatedId(state, props),
            students: selectStudents(state, props),
        });
    },
    (dispatch, props) => ({
        actions: bindActionCreators({
            getTitles: getTitles,
            studentsGet: getStudentByParent,
            activityCreate: create,
        }, dispatch)
    })
)(EssayComponent);