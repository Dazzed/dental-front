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

const ramosFamilyMembers = [
  {
    id: 1,
    firstName: 'Mark Jr',
    lastName: 'Ramos',
    birthDate: '1999-09-09T00:00:00.000Z',
    email: 'mark.jr.ramos@gmail.com',
    phone: '1-123-1234',
    avatar: 'http://www.teenink.com/images/default_face.gif',
    familyRelationship: 'son',
    createdAt: '2016-09-16T12:27:01.613Z',
    updatedAt: '2016-09-16T12:27:01.613Z',
    userId: 1,
  },
  {
    id: 2,
    firstName: 'Melody',
    lastName: 'Ramos',
    birthDate: '2004-04-04T00:00:00.000Z',
    email: 'melody.ramos@gmail.com',
    phone: '1-456-6789',
    avatar: 'http://www.teenink.com/images/default_face.gif',
    familyRelationship: 'daughter',
    createdAt: '2016-09-16T12:27:01.613Z',
    updatedAt: '2016-09-16T12:27:01.613Z',
    userId: 1,
  }
];

const johnFamilyMembers = [
  {
    id: 3,
    firstName: 'John',
    lastName: 'Snowe',
    birthDate: '1999-09-09T00:00:00.000Z',
    email: 'john.jr.snowe@gmail.com',
    phone: '1-123-1234',
    avatar: 'http://www.teenink.com/images/default_face.gif',
    familyRelationship: 'son',
    createdAt: '2016-09-16T12:27:01.613Z',
    updatedAt: '2016-09-16T12:27:01.613Z',
    userId: 2,
  },
  {
    id: 4,
    firstName: 'John',
    lastName: 'Snowe',
    birthDate: '1978-04-04T00:00:00.000Z',
    email: 'john.snowe@gmail.com',
    phone: '1-456-6789',
    avatar: 'http://www.teenink.com/images/default_face.gif',
    familyRelationship: 'partner',
    createdAt: '2016-09-16T12:27:01.613Z',
    updatedAt: '2016-09-16T12:27:01.613Z',
    userId: 2,
  },
  {
    id: 5,
    firstName: 'Rachael',
    lastName: 'Snowe',
    birthDate: '2004-04-04T00:00:00.000Z',
    email: 'rachael.snowe@gmail.com',
    phone: '1-456-6789',
    avatar: 'http://www.teenink.com/images/default_face.gif',
    familyRelationship: 'daughter',
    createdAt: '2016-09-16T12:27:01.613Z',
    updatedAt: '2016-09-16T12:27:01.613Z',
    userId: 2,
  }
];

const patients = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Ramos',
    createdAt: '2016-09-14T12:27:01.613Z',
    contactMethod: 'office',
    // phoneNumbers: [{
    //   number:"123456",
    // }],
    phoneNumber: '1-222-3333',
    email: 'mark.ramos@gmail.com',
    lastReview: {
      createdAt: '2016-09-20T16:27:01.613Z',
      rating: 5,
      comment: 'Ever since I was a kid, I dreaded going to the dentist. But with Wells Family, I was assured with friendly and professional stuff that my dental procedure won\'t hurt. Lo and behold, their right!',
    },
    membership: {
      status: 'active',
      totalMontlyPayment: 110,
      paidAt: '2016-09-20T16:27:01.613Z',
    },
    familyMemberCount: 2,
    familyMembers: ramosFamilyMembers,
    avatar: 'http://www.iconpot.com/icon/preview/male-user-avatar.jpg',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Snowe',
    createdAt: '2016-09-20T12:27:01.613Z',
    contactMethod: 'office',
    // phoneNumbers: [{
    //   number:"123456",
    // }],
    phoneNumber: '1-222-3333',
    email: 'john.snowe@hotmail.com',
    lastReview: {
      createdAt: '2016-09-20T16:27:01.613Z',
      rating: 2,
      comment: 'I dont like the services!',
    },
    membership: {
      status: 'inactive-cancelled',
      totalMontlyPayment: 30,
      paidAt: '2016-09-21T16:27:01.613Z',
    },
    familyMemberCount: 3,
    familyMembers: johnFamilyMembers,
    avatar: 'http://www.iconpot.com/icon/preview/male-user-avatar.jpg',
  }
];

export function fetchMyDentist () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: dentist });
    }, 100);
  });
}

export function fetchMyPatients () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: patients });
    }, 100);
  });
}
