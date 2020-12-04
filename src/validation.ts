import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required, email, min, numeric, max } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'This is not a valid email'
});
extend('password', {
  params: ['target'],
  validate(value, params: Record<string, any>) {
    return value === params.target;
  },
  message: 'Password confirmation does not match'
});
extend('min', {
  ...min,
  message(value, args) {
    return `Must have at least ${args.length} characters`;
  }
});
extend('numeric', {
  ...numeric,

  message: 'Must be a numeric value'
});
extend('max', {
  ...max,

  message(value, args) {
    return `You have exceed the maximum number of characters. Maximum characters:${args.length}`;
  }
});
export { ValidationObserver, ValidationProvider };
