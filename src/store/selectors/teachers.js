import { createSelector } from 'reselect';

export const selectTeacherList = (state) => state.teachers.data;

export const selectTeachers = createSelector(
    selectTeacherList,
    (teachers) => teachers,
);

export const createTeacherSelector = (selectTeacherId) => createSelector(
    selectTeacherId,
    selectTeachers,
    (teacherId, teachers) => {
        return teachers.find((teacher) => teacher.id === parseInt(teacherId));
    }
);