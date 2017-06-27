export function removeDuplicates(array, key) {
  let obj = {};
  let filteredArray = [];
  for (let i = 0, len = array.length; i < len; i++) {
    obj[array[i][key].toString()] = array[i];
  }

  for (let j in obj) {
    if (obj.hasOwnProperty(j)) {
      filteredArray.push(obj[j]);
    }
  }

  return filteredArray;
}