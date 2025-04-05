import ValidationError from "../../error/ValidationError.js";

const validation = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ValidationError(result.error)
  } else {
    return result.value;
  }
};

export default validation;
