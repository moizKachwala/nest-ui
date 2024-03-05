export const ACTIVITIES_GET = 'ACTIVITIES_GET';
export const ACTIVITIES_GET_PENDING = 'ACTIVITIES_GET_PENDING';
export const ACTIVITIES_GET_FULFILLED = 'ACTIVITIES_GET_FULFILLED';
export const ACTIVITIES_GET_REJECTED = 'ACTIVITIES_GET_REJECTED';

export const ACTIVITIES_CREATE = 'ACTIVITIES_CREATE';
export const ACTIVITIES_CREATE_PENDING = 'ACTIVITIES_CREATE_PENDING';
export const ACTIVITIES_CREATE_FULFILLED = 'ACTIVITIES_CREATE_FULFILLED';
export const ACTIVITIES_CREATE_REJECTED = 'ACTIVITIES_CREATE_REJECTED';

// export const ACTIVITIES_GET_BY_STUDENT = 'ACTIVITIES_GET_BY_STUDENT';
// export const ACTIVITIES_GET_BY_STUDENT_PENDING = 'ACTIVITIES_GET_BY_STUDENT_PENDING';
// export const ACTIVITIES_GET_BY_STUDENT_FULFILLED = 'ACTIVITIES_GET_BY_STUDENT_FULFILLED';
// export const ACTIVITIES_GET_BY_STUDENT_REJECTED = 'ACTIVITIES_GET_BY_STUDENT_REJECTED'; 

// export const ACTIVITIES_SUBMIT = 'ACTIVITIES_SUBMIT';
// export const ACTIVITIES_SUBMIT_PENDING = 'ACTIVITIES_SUBMIT_PENDING';
// export const ACTIVITIES_SUBMIT_FULFILLED = 'ACTIVITIES_SUBMIT_FULFILLED';
// export const ACTIVITIES_SUBMIT_REJECTED = 'ACTIVITIES_SUBMIT_REJECTED';

export const create = (activity, callback) => ({
    type: ACTIVITIES_CREATE,
    payload: { activity, callback },
});

export const get = (activityId, callback) => ({
    type: ACTIVITIES_GET,
    payload: { activityId, callback },
});

// export const getActivitiesByStudent = (studentId, callback) => ({
//     type: ACTIVITIES_GET_BY_STUDENT,
//     payload: { studentId, callback },
// });

// export const submitAssignment = (assignmentId, response) => ({
//     type: ACTIVITIES_SUBMIT,
//     payload: {assignmentId, response}
// });