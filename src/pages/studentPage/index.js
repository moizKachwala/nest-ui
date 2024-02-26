import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import { getStudentByParent } from '../../store/actions/students.js';
import { selectStudents } from '../../store/selectors/students.js';
import {createStringDataField} from '../../utils/format.js';
import {getAssociatedId} from '../../store/selectors/session.js';

import StudentPageComponent from './StudentPage.js';

const selectFields = createSelector(
    (state) => [
        createStringDataField('user.firstName', 'Firstname', { secondLevel: 'firstName' }),
        createStringDataField('user.lastName', 'LastName'),
        createStringDataField('user.email', 'Email'),
        createStringDataField('studentId', 'Student Id'),
    ]
);

export const StudentPage = connect(
    () => {
        return (state) => ({
            students: selectStudents(state),
            studentListPending: state.students.list.pending,
            fields: selectFields(state),
            getParentId: getAssociatedId(state),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            studentGetByParent: getStudentByParent
        }, dispatch)
    })
)(StudentPageComponent);