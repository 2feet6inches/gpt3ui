export const getBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // @ts-ignore
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}
