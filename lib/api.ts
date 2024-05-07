"use server";
import ImageKit from "imagekit";
import { convertImageToBase64 } from "./utils";

const imageKitClient = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL!,
});

export async function uploadWithImageKit(file: string, type: string) {
  try {
    const id = Math.random().toString(36).substring(0, 18);

    const results = await imageKitClient.upload({
      file: file,
      fileName: `${id}.${type}`,
    });
    // console.log({ results });
    const url = results.url;
    return url;
  } catch (errPayload: any) {
    console.log(errPayload.message);
    throw new Error(
      errPayload?.response?.data?.error || "Something went wrong"
    );
  }
}
