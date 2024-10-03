import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { storage } from "@/lib/firebase/clientApp"

export async function updateCustomerImage(customerId: string, image: any) {
  try {
    if (!customerId) throw new Error("No restaurant ID has been provided.")

    if (!image || !image.name) throw new Error("A valid image has not been provided.")

    const publicImageUrl = await uploadImage(customerId, image)
    await updateCustomerImage(customerId, publicImageUrl)

    return publicImageUrl
  } catch (error) {
    console.error("Error processing request:", error)
  }
}

async function uploadImage(restaurantId: any, image: any) {
  if (!storage) throw "no storage"

  const filePath = `images/${restaurantId}/${image.name}`
  const newImageRef = ref(storage, filePath)
  await uploadBytesResumable(newImageRef, image)

  return await getDownloadURL(newImageRef)
}
