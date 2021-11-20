// TODO: Add new validator if needed
export interface ValidatorSchema {
  body?: any,
}

export function validate(validatorSchema: ValidatorSchema) {
  return function(target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const req = args[0];
      const res = args[1];
      const valide = validatorSchema.body?.validate(req.body);
      if (valide.error) {
        res.status(404).send(valide.error.details[0].message);
        return;
      }

      const result = original.apply(this, args);
      return result;
    };

    return descriptor;
  };
};
