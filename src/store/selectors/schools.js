import { createSelector } from 'reselect';

export const selectSchoolList = (state) => state.schools.data;

export const selectSchools = createSelector(
    selectSchoolList,
    (schools) => schools,
);

export const createSchoolSelector = (selectSchoolId) => createSelector(
    selectSchoolId,
    selectSchools,
    (schoolId, schools) => {
        return schools.find((school) => school.id === parseInt(schoolId));
    }
);