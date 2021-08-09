import { saveAs } from 'file-saver';
export const downloadCsvBase64 = async (str, name) => {
  const blob = await fetch(`data:text/csv;base64,${str}`).then((res) =>
    res.blob()
  );
  const url = URL.createObjectURL(blob);
  saveAs(url, `${name}.csv`);
};

export const downloadFileFromUrl = saveAs;
