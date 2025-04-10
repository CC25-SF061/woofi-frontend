export const ValidateFields = (fields, rules, setError) => {
  const errors = {};

  for (const field in rules) {
    const value = fields[field]?.trim() || '';
    const rule = rules[field];

    if (rule.required && !value) {
      errors[field] = `${formatFieldName(field)} is required`;
      continue;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${formatFieldName(field)} must be at least ${rule.minLength} characters`;
      continue;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${formatFieldName(field)} must be no more than ${rule.maxLength} characters`;
      continue;
    }

    if (rule.isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field] = 'Invalid email format';
        continue;
      }
    }

    if (rule.match !== undefined && value !== rule.match) {
      errors[field] = `${formatFieldName(field)} does not match`;
      continue;
    }
  }

  setError(errors);
  return Object.keys(errors).length === 0;
};

const formatFieldName = (name) => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};
