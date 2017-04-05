/*
Learn More Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';


/*
Selectors
================================================================================
*/
const domainSelector = state => state.learnMorePage;

/*
Send Contact Us Message
------------------------------------------------------------
*/
const editingContactUsMessageSelector = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'contactUsMessage') {
      return substate.editing;
    }

    return null;
  }
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  // send contact us message
  editingContactUsMessageSelector,
};
