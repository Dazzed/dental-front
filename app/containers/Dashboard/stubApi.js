/* eslint-disable */
const dentist = {
  name: 'Dr. L Brett Wells, MD',
  address: 'Raleigh, North Carolina',
  description: 'Wells Family Dentistry is a leading family dental office in the heart of Raleigh, North Carolina.\n Dr. L Brett Wells and his team of industry experts aspire to provide a positive and comfortable dental experience for the people of the community.', // eslint-disable
  membershipFee: '$20',
  childMembershipFee: '$17',
  url: 'www.wellsfamilydental.com',
  email: 'dentistinfo@example.com',
  phone: '929-123-0231',
  avatar: 'http://www.iconpot.com/icon/preview/male-user-avatar.jpg',
};

const familyMembers = [
  {
    'firstName': 'Stan',
    'lastName': 'Lee',
    'relationship': 'Son',
    'createdAt': '07-04-2016',
    'accountOwner': 'true',
    'type': 'Child',
    'fee': '$20.00',
    'avatar': 'http://www.teenink.com/images/default_face.gif',
  },
  {
    'firstName': 'Mike',
    'lastName': 'ODell',
    'relationship': 'Son',
    'createdAt': '07-04-2016',
    'accountOwner': 'false',
    'type': 'Adult',
    'fee': '$50.00',
    'avatar': 'http://www.iconpot.com/icon/preview/male-user-avatar.jpg',
  }
];

export function fetchMyDentist () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: dentist });
    }, 100);
  });
}

export function fetchMyFamily () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: familyMembers });
    }, 100);
  });
}
