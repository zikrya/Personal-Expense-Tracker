
//for unit test: the function has no dependency
const generateLoginInfo = (email, password) => {
    if(email === "" || password === "") return null;
    return {email: email, password: password}; 
};

//for integration test: the function check if the generated info is a valid input
//email: email address
//password: Minimum eight characters, at least one letter and one number
checkEmail = (email) => {
    if(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) === null) return false;
    return email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)[0];
} 
checkPassword = (password) => {
    if(password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) === null) return false;
    return password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)[0];
}
loginInfoIsValid = (email, password) => {

    return checkEmail(email) === email && checkPassword(password) === password;
}
exports.generateValidLoginInfo = (email, password) => {

    if(loginInfoIsValid(email, password)) return generateLoginInfo(email, password);
    else return null;
}
exports.generateLoginInfo = generateLoginInfo;