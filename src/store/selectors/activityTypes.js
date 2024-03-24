import { createSelector } from 'reselect';

export const selectActivityTypes = (state) => state.activityTypes.list;

export const createActivityTypeSelector = (selectActivityTypeId) => createSelector(
    selectActivityTypeId,
    selectActivityTypes,
    (activityTypeId, activityTypes) => {
        return activityTypes.find((activityType) => activityType.id === activityTypeId);
    }
);