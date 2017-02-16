import { createSelector } from 'reselect'

const colorSelector = state => state.color;

export const hslSelector = createSelector(
    colorSelector,
    (color) => ``
);
