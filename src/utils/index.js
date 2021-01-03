export const returnActioncls = (action) => {
    return action.replace(/\s+/g, '').toLowerCase()
}