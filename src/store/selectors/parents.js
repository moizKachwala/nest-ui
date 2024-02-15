import { createSelector } from 'reselect';

export const selectParentList = (state) => state.parents.data;

export const selectParents = createSelector(
    selectParentList,
    (parents) => parents,
);

export const createParentSelector = (selectParentId) => createSelector(
    selectParentId,
    selectParents,
    (parentId, parents) => {
        return parents.find((parent) => parent.id === parseInt(parentId));
    }
);