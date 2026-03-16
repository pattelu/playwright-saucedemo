export const standardUser = {
  username: process.env.STANDARD_USER!,
  password: process.env.PASSWORD!,
};

export const lockedOutUser = {
  username: process.env.LOCKED_OUT_USER!,
  password: process.env.PASSWORD!,
};

export const errorMessages = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  missingUsername: 'Epic sadface: Username is required',
  missingPassword: 'Epic sadface: Password is required',
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
};
