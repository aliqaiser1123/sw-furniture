import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueId = uuidv4();
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const fileName = `${uniqueId}.${extension}`;

    // Path to public/models
    const uploadDir = join(process.cwd(), "public", "models");
    const filePath = join(uploadDir, fileName);

    // Write file to public/models
    await writeFile(filePath, buffer);

    // Return the public URL
    const modelUrl = `/models/${fileName}`;

    return NextResponse.json({
      success: true,
      url: modelUrl,
      fileName: originalName,
      size: file.size,
    });
  } catch (error) {
    console.error("Error uploading 3D model:", error);
    return NextResponse.json(
      { error: "Failed to upload 3D model" },
      { status: 500 }
    );
  }
}
