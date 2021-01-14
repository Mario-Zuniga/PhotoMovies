export const storeName = content => ({
    type: "STORE",
    payload: content
});

export const toggled = () => {
    return {
        type: "TOGGLED"
    };
};