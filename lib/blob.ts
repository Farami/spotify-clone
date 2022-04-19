function blobToBase64(blob: Blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise<string>((resolve) => {
    reader.onloadend = () => {
      console.log(reader.result);
      resolve(reader.result as string);
    };
  });
}

export default blobToBase64;
