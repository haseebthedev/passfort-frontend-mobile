import AxiosInstance from "@/services/api";

export const uploadImageToBackend = async (selectedImage: any): Promise<string> => {
  try {
    if (!selectedImage?.uri) throw new Error("No image selected");

    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage.uri,
      type: selectedImage.mimeType || "image/jpeg",
      name: selectedImage.fileName || "upload.jpg",
    } as unknown as Blob);

    const uploadResponse = await AxiosInstance.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return uploadResponse.data.result.url;
  } catch (error: any) {
    console.error("File upload error:", error);
    throw new Error(error);
  }
};
