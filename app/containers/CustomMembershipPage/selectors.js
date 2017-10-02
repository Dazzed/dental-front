export function selectActivePlans(dentistInfo) {
  if (dentistInfo.custom_memberships) {
    if (dentistInfo.custom_memberships.length) {
      dentistInfo.custom_memberships = dentistInfo.custom_memberships
        .filter(m => m.active);
    }
  }
  return dentistInfo;
}
