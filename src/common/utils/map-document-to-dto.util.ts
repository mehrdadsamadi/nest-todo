export function mapDocumentToDto<TDto extends object>(
  document: object,
  dtoClass: new () => TDto,
): TDto {
  const dtoInstance = new dtoClass();
  const dtoKeys = Object.keys(dtoInstance) as (keyof TDto)[];
  const result = {} as TDto;

  dtoKeys.forEach((key) => {
    const value = (document as Record<string, unknown>)[key as string];
    result[key] = value as TDto[typeof key];
  });

  return result;
}
