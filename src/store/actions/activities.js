export const ACTIVITIES_CREATE = 'ACTIVITIES_CREATE';
export const ACTIVITIES_CREATE_PENDING = 'ACTIVITIES_CREATE_PENDING';
export const ACTIVITIES_CREATE_FULFILLED = 'ACTIVITIES_CREATE_FULFILLED';
export const ACTIVITIES_CREATE_REJECTED = 'ACTIVITIES_CREATE_REJECTED';

export const create = (activity, callback) => ({
    type: ACTIVITIES_CREATE,
    payload: { activity, callback },
});