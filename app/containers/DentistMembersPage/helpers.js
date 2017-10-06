// If no monthly memberships are enrolled the recurring payment date should be N/A.
export function setRecurringDate(patient) {
  try {
    console.log(4, patient)
    let anyMonthly = false;
    const { subscription, members } = patient;
    // If any active monthly subscription is present return the patient object.
    if (
      (subscription.membership.type === 'month' ||
      subscription.membership.type === 'custom') &&
      subscription.status === 'active'
    ) {
      anyMonthly = true;
    }
    const anyMonthlyMembers = members
      .some((m) => {
        const { type } = m.subscription.membership;
        return (type === 'month' || type === 'custom') && m.subscription.status === 'active';
      });
    console.log(12, subscription, members);
    console.log(13, anyMonthly, anyMonthlyMembers);
    if (anyMonthly || anyMonthlyMembers) {
      return patient;
    }
    patient.recurring_payment_date = 'N/A';
    return patient;
  } catch (e) {
    return 'N/A';
  }
}
