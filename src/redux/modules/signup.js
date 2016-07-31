const SHOW_FAMILY_MEMBER_FORM = 'dental-ui/signup/SHOW_FAMILY_MEMBER_FORM';
const HIDE_FAMILY_MEMBER_FORM = 'dental-ui/signup/HIDE_FAMILY_MEMBER_FORM';
const REGISTER_USER = 'dental-ui/signup/REGISTER_USER';

const initialState = {
  showFamilyMemberForm: false,
  index: -1,
};

// TODO: Do a correct way the register action/reducer flow
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_FAMILY_MEMBER_FORM:
      return {
        showFamilyMemberForm: true,
        index: action.index,
      };
    case HIDE_FAMILY_MEMBER_FORM:
      return {
        showFamilyMemberForm: false,
        index: -1, // we don't need the index anymore
      };
    case REGISTER_USER:
      console.log(action.data);
      return state;
    default:
      return state;
  }
}

export function showFamilyMemberForm(index = -1) {
  return {
    type: SHOW_FAMILY_MEMBER_FORM,
    index,
  };
}

export function hideFamilyMemberForm() {
  return {
    type: HIDE_FAMILY_MEMBER_FORM,
  };
}


export function register(data) {
  return {
    type: REGISTER_USER,
    data,
  };
}
