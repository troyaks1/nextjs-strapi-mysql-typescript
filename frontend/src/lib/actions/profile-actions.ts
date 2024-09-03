"use server";
import qs from "qs";
import { mutateData } from "@/lib/services/mutate-data";
import { flattenStrapiAttributes } from "@/lib/utils/strapi";
import { getUserMeLoader } from "@/lib/services/get-user-me";
import { z } from "zod";
import { fileDeleteService, fileUploadService } from "../services/file-service";

export async function updateProfileAction(
  userId: string,
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);

  const query = qs.stringify({
    populate: "*",
  });

  const payload = {
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
  };

  const responseData = await mutateData(
    "PUT",
    `/api/users/${userId}?${query}`,
    payload
  );

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Register.",
    };
  }

  const flattenedData = flattenStrapiAttributes(responseData);

  return {
    ...prevState,
    message: "Profile Updated",
    data: flattenedData,
    strapiErrors: null,
  };
}

const MAX_FILE_SIZE = 1000000; // 1MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// VALIDATE IMAGE WITH ZOD 
const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Please update or add new image.")

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size exceeded. Max size is ${MAX_FILE_SIZE / 1000000}MB.`),
});

export async function uploadProfileImageAction(
  imageId: string,
  prevState: any,
  formData: FormData
) {
  console.log("uploadProfileImageAction");
  // GET THE LOGGED IN USER
  const user = await getUserMeLoader();
  if (!user.ok) throw new Error("You are not authorized to perform this action.");
  
  const userId = user.data.id;

  // CONVERT FORM DATA TO OBJECT
  const data = Object.fromEntries(formData);

  // VALIDATE THE IMAGE
  console.log("Validate the IMAGE");
  const validatedFields = imageSchema.safeParse({
    image: data.image,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      data: null,
      message: "Invalid Image",
    };
  }

  // DELETE PREVIOUS IMAGE IF EXISTS
  console.log("Delete Previous Image");
  if (imageId) {
    try {
      await fileDeleteService(imageId);
    } catch (error) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Failed to Delete Previous Image.",
      };
    }
  }

  // UPLOAD NEW IMAGE TO MEDIA LIBRARY
  console.log("Upload New Image");
  const fileUploadResponse = await fileUploadService(data.image);
  if (!fileUploadResponse) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (fileUploadResponse.error) {
    return {
      ...prevState,
      strapiErrors: fileUploadResponse.error,
      zodErrors: null,
      message: "Failed to Upload File.",
    };
  }
  const updatedImageId = fileUploadResponse[0].id;
  const payload = { image: updatedImageId };

  // UPDATE USER PROFILE WITH NEW IMAGE
  console.log("Update User Profile with New Image");
  const updateImageResponse = await mutateData(
    "PUT",
    `/api/users/${userId}`,
    payload
  );
  const flattenedData = flattenStrapiAttributes(updateImageResponse);
  return {
    ...prevState,
    data: flattenedData,
    zodErrors: null,
    strapiErrors: null,
    message: "Image Uploaded",
  };
}