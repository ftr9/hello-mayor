export const USERNAME_RULE = {
  minLength: {
    value: 3,
    message: '* username must have atleast 3 characters',
  },
  maxLength: {
    value: 20,
    message: '* more than 20 characters is not allowed',
  },
  required: {
    value: true,
    message: '* username is required',
  },
};
export const PHONE_NUM_RULE = {
  pattern: {
    value: /(\+977)?[9][6-9]\d{8}/,
    message: '* please enter a valid phone number',
  },
  maxLength: {
    value: 10,
    message: '* please enter a valid phone number',
  },
  required: {
    value: true,
    message: '* phonenumber is required',
  },
};
export const EMAIL_RULE = {
  pattern: {
    value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: '* please enter a valid email address',
  },

  required: {
    value: true,
    message: '* email address is required',
  },
};
export const PASSWORD_RULE = {
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    message:
      '* password must have atleast 8 characters with one lowercase,one uppercase and one number',
  },

  required: {
    value: true,
    message: '* password is required',
  },
};
