export default function formatUser (user, dentist) {
  let monthly = 0;

  if (dentist && dentist.subscriptions && dentist.subscriptions[0]) {
    monthly = dentist.subscriptions[0].monthly;
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    familyRelationship: 'me',
    createdAt: user.createdAt,
    payingMember: user.payingMember,
    accountHolder: true,
    avatar: null,
    subscription: {
      monthly,
    },
  };
}
