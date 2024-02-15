export const PARENTS_LIST = 'PARENTS_LIST';
export const PARENTS_LIST_PENDING = 'PARENTS_LIST_PENDING';
export const PARENTS_LIST_FULFILLED = 'PARENTS_LIST_FULFILLED';
export const PARENTS_LIST_REJECTED = 'PARENTS_LIST_REJECTED';

export const PARENTS_GET = 'PARENTS_GET';
export const PARENTS_GET_PENDING = 'PARENTS_GET_PENDING';
export const PARENTS_GET_FULFILLED = 'PARENTS_GET_FULFILLED';
export const PARENTS_GET_REJECTED = 'PARENTS_GET_REJECTED';

export const get = (parentId, callback) => ({
    type: PARENTS_GET,
    payload: { parentId, callback },
});