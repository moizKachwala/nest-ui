import { createSelector } from 'reselect';

export const selectAssignedActivities = (state) => state.activityAssignments.data;
export const selectedActivity = (state) => state.activityAssignments.activity;