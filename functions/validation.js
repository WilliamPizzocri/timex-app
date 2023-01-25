const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

const validatePassword = (password) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password)) {
        return true;
    }
    return false;
}

module.exports.validateEmail = validateEmail;
module.exports.validatePassword = validatePassword;
