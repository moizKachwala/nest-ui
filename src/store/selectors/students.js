import { createSelector } from 'reselect';

export const selectStudentList = (state) => state.students.data;

export const selectStudents = createSelector(
    selectStudentList,
    (students) => students,
);

export const createStudentSelector = (selectStudentId) => createSelector(
    selectStudentId,
    selectStudents,
    (studentId, students) => {
        return students.find((student) => student.id === parseInt(studentId));
    }
);