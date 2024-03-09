export const ACTIVITIES_GET = 'ACTIVITIES_GET';
export const ACTIVITIES_GET_PENDING = 'ACTIVITIES_GET_PENDING';
export const ACTIVITIES_GET_FULFILLED = 'ACTIVITIES_GET_FULFILLED';
export const ACTIVITIES_GET_REJECTED = 'ACTIVITIES_GET_REJECTED';

export const ACTIVITIES_CREATE = 'ACTIVITIES_CREATE';
export const ACTIVITIES_CREATE_PENDING = 'ACTIVITIES_CREATE_PENDING';
export const ACTIVITIES_CREATE_FULFILLED = 'ACTIVITIES_CREATE_FULFILLED';
export const ACTIVITIES_CREATE_REJECTED = 'ACTIVITIES_CREATE_REJECTED';

export const create = (activity, callback) => ({
    type: ACTIVITIES_CREATE,
    payload: { activity, callback },
});

export const get = (activityId, callback) => ({
    type: ACTIVITIES_GET,
    payload: { activityId, callback },
});
