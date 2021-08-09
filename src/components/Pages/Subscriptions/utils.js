export const convertFromByteToGiGaByte = (number) => {
  if (!number || Number.isNaN(number)) return 0;

  const numberConvert = Number(number) / 1000 ** 3;

  return numberConvert;
};

export const convertFromGiGaByteToByte = (number) => {
  if (!number || Number.isNaN(number)) return 0;

  const numberConvert = Number(number) * 1000 ** 3;

  return numberConvert;
};
