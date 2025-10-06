export const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const mimeType = result.split(';')[0].split(':')[1];
      const base64 = result.split(',')[1];
      resolve({ base64, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
};

export const convertImageFormat = (
  imageDataUrl: string,
  targetMimeType: 'image/jpeg' | 'image/png'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }
      ctx.drawImage(image, 0, 0);
      const convertedDataUrl = canvas.toDataURL(targetMimeType, 0.95); // 0.95 for high quality JPEG
      resolve(convertedDataUrl);
    };
    image.onerror = (error) => reject(error);
    image.src = imageDataUrl;
  });
};

export const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
};