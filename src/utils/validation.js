export const isValidUsername = async (username) => {
    switch (true) {
        case !username:
            return 'Username cannot be empty';
        case username.length < 5:
            return 'Username must be at least 5 characters long';
        case username.length > 15:
            return 'Username cannot be more than 15 charaters long';
        case !/^[a-zA-Z0-9_]+$/.test(username):
            return 'Username can only contain letters, numbers, and underscores';
        case await checkIfUsernameExists(username):
            return 'Username already exists';
        default:
            return 'user created';
    }
};

export const checkIfUsernameExists = async (username) => {
    const response = await fetch(`http://localhost:3000/users/${username}`);
    const data = await response.json();
    if (data.user) {
        return true;
    } else {
        return false;
    }
};