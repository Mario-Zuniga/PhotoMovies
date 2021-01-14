const storeNameReducer = (state = "", action) => {
    switch(action.type) {
        case "STORE": {
            return action.payload

        }
        default: {
            return state
        }
    }
}

export default storeNameReducer;