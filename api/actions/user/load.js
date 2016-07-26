const initialUser = {
  'id': 1,
  'email': 'test@test.com',
  'firstName': 'Mike',
  'lastName': 'ODell',
  'addresses': [
    {
      'address1': '123 Main Street',
      'address2': '',
      'city': 'Atlanta',
      'state': 'Georgia',
      'zip': '12312'
    },
    {
      'address1': '123 Main Street',
      'address2': '',
      'city': 'Atlanta',
      'state': 'Georgia',
      'zip': '12312'
    }
  ],
  'members': [
    {
      'firstName': 'Stan',
      'lastName': 'Lee',
      'relationship': 'Son',
      'createdAt': '07-04-2016',
      'accountOwner': 'true',
      'type': 'Child',
      'fee': '$20.00',
    },
    {
      'firstName': 'Mike',
      'lastName': 'ODell',
      'relationship': 'Son',
      'createdAt': '07-04-2016',
      'accountOwner': 'false',
      'type': 'Adult',
      'fee': '$50.00',
    }
  ],
  'phones': [
    {
      'number': '123-123-1234',
      'type': 'Home'
    },
    {
      'number': '123-123-1234',
      'type': 'Mobile'
    }
  ],
  'dentist': [
    {
      'name': 'Dr. L Brett Wells, MD',
      'address': 'Raleigh, North Carolina',
      'description': 'Wells Family Dentistry is a leading family dental office in the heart of Raleigh, North Carolina.\n Dr. L Brett Wells and his team of industry experts aspire to provide a positive and comfortable dental experience for the people of the community.',
      'membershipFee': '$20',
      'childMembershipFee': '$17',
      'url': 'http://www.wellsfamilydental.com',
      'email': 'test@test.com',
      'phone': '123-123-1234'
    }
  ]
};

export default function load() {
  return new Promise((resolve) => {
    // make async call to database
    setTimeout(() => {
      resolve(initialUser);
    }, 500); // simulate async load
  });
}
