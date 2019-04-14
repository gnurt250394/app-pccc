export const logger = store => next => action => {
    console.log("State: ", store.getState());
    next(action);
    console.log("State updated: ", store.getState());
}