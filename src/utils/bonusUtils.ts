export const getBonusWithOperator = (bonus: number): string => {
  const operator = bonus >= 0
    ? "+"
    : "";

  return `${operator}${bonus}`;
};
