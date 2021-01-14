const themeReducer = (state = false, action) => {
    switch(action.type) {
        case "TOGGLED":
            return !state;
        default:
            return state;
    }
}

export default themeReducer;