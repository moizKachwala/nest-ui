import { createSelector } from 'reselect';

export const selectAssignedActivities = (state) => state.activities.data;

export const createActivitySelector = (selectActivityId) => createSelector(
    selectActivityId,
    selectAssignedActivities,
    (selectActivityId, assignedActivities) => {
        return assignedActivities.find((assignedActivity) => assignedActivity.activity.id === selectActivityId);
    }
);