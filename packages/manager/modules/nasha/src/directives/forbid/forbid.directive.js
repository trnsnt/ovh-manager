/**
 * <form name="myForm">
 *   <input
 *     name="myInput"
 *     data-forbid="value"
 *     data-forbid-values="[ 'some', 'other', 'values' ]"
 *   />
 *   <div ng-messages="myForm.myInput.$error"
 *     <p data-ng-message="forbid">Please choose another value</p>
 *     <p data-ng-message="forbidValues">"some", "other", "values" are forbidden</p>
 *   </div>
 * </form>
 */
export default () => ({
  restrict: 'A',
  require: 'ngModel',
  scope: {
    forbid: '@',
    forbidValues: '<?',
  },
  link: (scope, element, attributes, ngModelController) => {
    const { forbid, forbidValues } = scope;
    Object.assign(ngModelController.$validators, {
      forbid: (value) => !!value && value !== forbid,
      forbidValues: (value) =>
        forbidValues ? !!value && !forbidValues.includes(value) : true,
    });
  },
});
