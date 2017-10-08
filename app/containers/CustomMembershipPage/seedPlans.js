/*
PLAN 1:
3 Cleanings Plan

CODE  PRICE FREQUENCY/PER YEAR
D0120 $50   2
D0274 $40   1
D1110 $100  3
D0140 $50   1
D0220 $25   1

PLAN 2:
4 Cleanings Plan

CODE  PRICE FREQUENCY/PER YEAR
D0120 $50   2
D0274 $40   1
D1110 $100  4
D0140 $50   1
D0220 $25   1

PLAN 3:
Perio Maintenance Plan

CODE  PRICE FREQUENCY/PER YEAR
D0120 $50   2
D0274 $40   1
D4910 $120  2
D0140 $50   1
D0220 $25   1

PLAN 4:
Adult Fluoride Plan

CODE  PRICE FREQUENCY/PER YEAR
D0120 $50   2
D0274 $40   1
D1110 $100  2
D0140 $50   1
D0220 $25   1
D1206 $40   2
*/

const seedPlansData = [
  {
    name: '3 Cleanings Plan',
    codes: [
      {
        priceCodeName: 'D0120',
        frequency: 2
      },
      {
        priceCodeName: 'D0274',
        frequency: 1
      },
      {
        priceCodeName: 'D1110',
        frequency: 3
      },
      {
        priceCodeName: 'D0140',
        frequency: 1
      },
      {
        priceCodeName: 'D0220',
        frequency: 1
      }
    ]
  },
  {
    name: 'Family 4 pack plan',
    codes: [
      {
        priceCodeName: 'D0120',
        frequency: 8
      },
      {
        priceCodeName: 'D0274',
        frequency: 4
      },
      {
        priceCodeName: 'D1110',
        frequency: 8
      },
      {
        priceCodeName: 'D0140',
        frequency: 4
      },
      {
        priceCodeName: 'D0220',
        frequency: 4
      }
    ]
  },
  {
    name: 'Perio Maintenance Plan',
    codes: [
      {
        priceCodeName: 'D0120',
        frequency: 2
      },
      {
        priceCodeName: 'D0274',
        frequency: 1
      },
      {
        priceCodeName: 'D4910',
        frequency: 2
      },
      {
        priceCodeName: 'D0140',
        frequency: 1
      },
      {
        priceCodeName: 'D0220',
        frequency: 1
      }
    ]
  },
  {
    name: 'Adult Fluoride Plan',
    codes: [
      {
        priceCodeName: 'D0120',
        frequency: 2
      },
      {
        priceCodeName: 'D0274',
        frequency: 1
      },
      {
        priceCodeName: 'D1110',
        frequency: 2
      },
      {
        priceCodeName: 'D0140',
        frequency: 1
      },
      {
        priceCodeName: 'D0220',
        frequency: 1
      },
      {
        priceCodeName: 'D1206',
        frequency: 2
      }
    ]
  }
];

export default seedPlansData;
