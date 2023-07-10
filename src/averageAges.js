'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menPeople = people.filter((item) => item.sex === 'm');

  const centuryPeopl = menPeople
    .filter((peopl) => century
      ? Math.ceil(peopl.died / 100) === century
      : menPeople
        .map((person) => person.died - person.born)
        .reduce((a, b) => a + b));

  const centuryMenYear = centuryPeopl.map((item) => item.died - item.born)
    .reduce((a, b) => a + b);

  return centuryMenYear / centuryPeopl.length;
}

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenPeople = people
    .filter((person) => withChildren
      ? person.sex === 'f' && people.find(
        (peopl) => person.name === peopl.mother
      )
      : person.sex === 'f');

  return womenPeople
    .map((peopl) => peopl.died - peopl.born)
    .reduce((a, b) => a + b) / womenPeople.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const motherWithSon = people.filter(child =>
    onlyWithSon
      ? people.find(woman => child.mother === woman.name) && child.sex === 'm'
      : people.find(woman => child.mother === woman.name)
  );

  return motherWithSon.reduce((sum, child) => sum
  + child.born - people.find((woman) =>
    child.mother === woman.name).born, 0) / motherWithSon.length;
}
// 1. find a mother of each person (or only for men)
// 2. keep people who have mothers in the array
// 3. calculate the difference child.born - mother.born
// 4. return the average value

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
