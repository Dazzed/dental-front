import {
  // fetch
  FETCH_DENTISTS_SUCCESS,
  FETCH_DENTIST_DETAILS_REQUEST,
  FETCH_DENTIST_DETAILS_SUCCESS,
  FETCH_DENTIST_MEMBERS_REQUEST,
  FETCH_DENTIST_MEMBERS_SUCCESS,
  FETCH_DENTIST_REPORTS_REQUEST,
  FETCH_DENTIST_REPORTS_SUCCESS,
  FETCH_DENTIST_REVIEWS_REQUEST,
  FETCH_DENTIST_REVIEWS_SUCCESS,
  FETCH_STATS_SUCCESS,

  // setters
  SET_SELECTED_DENTIST,
  SET_EDITING_DENTIST_ID,

  // search / sort
  SEARCH,
  SORT,

  // actions
  EDIT_DENTIST_SUCCESS,
  DELETE_DENTIST_REVIEW_SUCCESS,
  FETCH_MANAGERS_SUCCESS,
  TOGGLE_REFUNDING_MEMBER,
  FAILED_REFUNDING_MEMBER,
  REFUNDING_MEMBER_SUCCESS,
  FETCH_MASTER_REPORTS_DATES_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  // fetch
  dentists: null,
  managers: null,
  dentistDetails: null,
  dentistMembers: null,
  dentistReviews: null,
  stats: null,
  dentistReports: null,

  // setters
  selectedDentist: null,

  // search / sort patients
  searchName: null,
  sortStatus: 'unassigned',
  refundingMember: null,
  masterReportsDates: {},
  editingDentistId: null
};


/*
Reducers
================================================================================
*/
export default function adminPageReducer (state = initialState, action) {
  let dentistIdx;

  switch (action.type) {    
    /*
    Fetch
    ------------------------------------------------------------
    */
    case FETCH_DENTISTS_SUCCESS:      
      return {
        ...state,
        dentists: action.payload,
      };

    case FETCH_DENTIST_DETAILS_REQUEST:
      return {
        ...state,
        dentistDetails: null
      };

    case FETCH_DENTIST_DETAILS_SUCCESS:
      return {
        ...state,
        dentistDetails: action.payload,
      };

    case FETCH_DENTIST_MEMBERS_REQUEST:
      return {
        ...state,
        dentistMembers: null,
      };

    case FETCH_DENTIST_MEMBERS_SUCCESS:
      return {
        ...state,
        dentistMembers: action.payload,
      };

    case FETCH_DENTIST_REPORTS_REQUEST:
      return {
        ...state,
        dentistReports: null,
      };

    case FETCH_DENTIST_REPORTS_SUCCESS:
      return {
        ...state,
        selectedDentist: {
          ...state.selectedDentist,
          reports: action.payload
        }
      };

    case FETCH_DENTIST_REVIEWS_REQUEST:
      return {
        ...state,
        dentistReviews: null,
      };

    case FETCH_DENTIST_REVIEWS_SUCCESS:
      return {
        ...state,
        dentistReviews: action.payload,
      };

    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload,
      };

    /* Setters
     * ------------------------------------------------------ */
    case SET_SELECTED_DENTIST:
      return {
        ...state,
        selectedDentist: action.dentist,
      };
    case SET_EDITING_DENTIST_ID:
      return {
        ...state,
        editingDentistId: action.dentistId
      };
    /*
    Search / Sort
    ------------------------------------------------------------
    */
    case SEARCH:
      return {
        ...state,
        searchName: action.name !== ""
                      ? action.name
                      : null,
      };

    case SORT:
      return {
        ...state,
        sortStatus: action.status,
      };

    /* Actions
     * ------------------------------------------------------ */
    case EDIT_DENTIST_SUCCESS:
      dentistIdx = state.dentists.findIndex(d => d.id === action.payload.id);

      return {
        ...state,
        dentists: [
          ...state.dentists.slice(0, dentistIdx),
          action.payload,
          ...state.dentists.slice(dentistIdx + 1),
        ],
        // selectedDentist: null,
        selectedDentist: action.payload,
        editingDentistId: null,
      };

    case DELETE_DENTIST_REVIEW_SUCCESS:
      return {
        ...state,
        dentistReviews: state.dentistReviews.filter((review) => {
          return review.id !== action.reviewId;
        }),
      };
    case FETCH_MANAGERS_SUCCESS:
      return {
        ...state,
        managers: action.payload,
      };
    case TOGGLE_REFUNDING_MEMBER:
      return {
        ...state,
        refundingMember: action.payload
      };
    case REFUNDING_MEMBER_SUCCESS:
    case FAILED_REFUNDING_MEMBER:
      return {
        ...state,
        refundingMember: null,
      };
    case FETCH_MASTER_REPORTS_DATES_SUCCESS:
      return {
        ...state,
        masterReportsDates: action.payload,
      };
    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}
