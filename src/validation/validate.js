const validation = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    console.log(result.error);
    throw new Error(result.error);
  } else {
    return result.value;
  }
};

export default validation;
