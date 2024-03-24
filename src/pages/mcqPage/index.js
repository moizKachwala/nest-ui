import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import McqPageComponent from './McqPage';
import { getMcqQuestions, list, validate } from '../../store/actions/chat';
import {create} from '../../store/actions/activities';
import { getStudentByParent } from '../../store/actions/students';
import { createSelector } from 'reselect';
import {getAssociatedId} from '../../store/selectors/session';
import {selectStudents} from '../../store/selectors/students';

export const McqPage = connect(
    () => {

        const selectMode = (state) => state.chat.titles;
        const selectMcqQuestions = (state) => state.chat.mcqQuestions;
        const selectInitialValues = createSelector(
            selectMode,
            selectMcqQuestions,
            (mode, mcqQuestions) => {
                return {
                        topic: 'Noun',
                        selectedQuestionIndices: mcqQuestions.map((_, index) => index),
                }
            }
        )

        return (state, props) => ({
            questionPending: state.chat.getMcqQuestions.pending,
            // activityCreatePending: state.activitvalidate.pending,
            mcqQuestions: state.chat.mcqQuestions,
            validations: state.chat.validations,
            initialValues: selectInitialValues(state, props),
            getParentId: getAssociatedId(state, props),
            students: selectStudents(state, props),
        });
    },
    (dispatch, props) => ({
        actions: bindActionCreators({
            getMcqQuestions: getMcqQuestions,
            studentsGet: getStudentByParent,
            activityCreate: create,
        }, dispatch)
    })
)(McqPageComponent);