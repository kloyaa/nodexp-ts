type HttpMessage = {
  [key: string]: { code: string; message: string };
};

export const httpMessage: HttpMessage = {
  // SUCCESS
  '00': {
    code: '00',
    message: 'Success',
  },
  '10101': {
    code: '10101',
    message: 'SMS sent successfully! Check your phone for the message.',
  },
  '10102': {
    code: '10102',
    message: 'Email sent successfully! Please check your inbox.',
  },
  '10103': {
    code: '10103',
    message: 'Created successfully!',
  },
  '10104': {
    code: '10104',
    message: 'Updated successfully!',
  },
  '10105': {
    code: '10105',
    message: 'Deleted successfully!',
  },
  '10106': {
    code: '10106',
    message: 'Updated failed.',
  },
  // FAILED
  '10200': {
    code: '10200',
    message:
      'Oops! Invalid email address format. Please enter a valid email address and try again.',
  },
  '10201': {
    code: '10201',
    message:
      'Oops! Invalid mobile number format. Please enter a valid mobile number and try again.',
  },
  '10202': {
    code: '10202',
    message:
      "We're sorry, but your account has been deactivated for violating our platform's rules and standards. Please review our policies and contact us if you have any questions or concerns.",
  },
  '10203': {
    code: '10203',
    message:
      "We're sorry for the inconvenience, but our server is currently undergoing maintenance. We'll be back up and running as soon as possible. Thank you for your patience!",
  },
  '10204': {
    code: '10204',
    message:
      'Oops! Something went wrong with your request. Please try again later.',
  },
  '10205': {
    code: '10205',
    message:
      'Oops! This username is already registered. Please use a different username or log in to your existing account.',
  },
  '10206': {
    code: '10206',
    message:
      "We're sorry, but your account has been temporarily locked due to suspicious login activity. For your protection, we've implemented this security measure. Please wait 10 minutes before attempting to log in again. Thank you for your patience and understanding.",
  },
  '10207': {
    code: '10207',
    message:
      "We're sorry, your connection has been temporarily blocked due to suspicious login attempts or violations, please wait for 10 minutes before attempting to access the platform again.",
  },
  // AUTHENTICATION
  '10301': {
    code: '10301',
    message: 'Oops! Incorrect username and/or password.',
  },
  '10302': {
    code: '10302',
    message: 'Oops! Incorrect current password.',
  },
  '10303': {
    code: '10303',
    message:
      'Oops! It looks like your session has expired or you are not currently authenticated. Please login again to continue.',
  },
  '10304': {
    code: '10304',
    message:
      'Oops! This operation requires administrator privileges to access.',
  },
  // TRANSACTIONS
  '10404': {
    code: '10404',
    message:
      'Oops! Invalid wallet address destination. Please double-check and try again.',
  },
  '10405': {
    code: '10405',
    message:
      'Transaction is processing. Please wait a moment and refresh the page for updates.',
  },
  '10406': {
    code: '10406',
    message:
      "Oops! We couldn't find your wallet. Please double-check the address or create a new wallet and link it.",
  },
  '10407': {
    code: '10407',
    message:
      "We apologize, but your transaction has failed due to a mismatch in seedphrases. The seedphrase associated with the address you provided doesn't match the one currently stored in your wallet. To resolve this issue, please update your wallet's seedphrase to match the one used for your account. You can make this update by going to your wallet settings. If you require any assistance with this process, please don't hesitate to contact our support team.",
  },
};
