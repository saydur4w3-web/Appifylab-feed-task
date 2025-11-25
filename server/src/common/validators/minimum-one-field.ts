import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MinimumOneFieldRequred(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'minimumOneFieldRequred',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [properties],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedProperties] = args.constraints;
          const object = args.object as any;

          // Check if current property has value OR any of the related properties have value
          return (
            (value !== undefined && value !== null && value !== '') ||
            relatedProperties.some((prop: string) => {
              const val = object[prop];
              return val !== undefined && val !== null && val !== '';
            })
          );
        },
      },
    });
  };
}