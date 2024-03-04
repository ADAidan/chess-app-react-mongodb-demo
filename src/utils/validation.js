export const isValidUsername = (username) => {
    switch (true) {
        case !username:
            return 'Username cannot be empty';
        case username.length < 5:
            return 'Username must be at least 5 characters long';
        case username.length > 15:
            return 'Username cannot be more than 15 charaters long';
        case !/^[a-zA-Z0-9_]+$/.test(username):
            return 'Username can only contain letters, numbers, and underscores';
        default:
            return true;
    }
};