import { Request, Response } from "express";
import { createPostSchema } from "../../validations/post.validation";
import { db } from "../../config/db";
import { postsTable } from "../../config/schema";
import { eq } from "drizzle-orm";
import { uploadToCloudinary } from "../../service/cloudinary.service";

export class PostController {
  crreatePost = async (req: Request, res: Response) => {
    try {
      const validateData = createPostSchema.parse(req.body);
      const { userId, title, content } = validateData;

      let imageUrl: string | undefined;
      let imagePublicId: string | undefined;

      if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      }

      const [insertedPost] = await db
        .insert(postsTable)
        .values({ userId, title, content, imageUrl, imagePublicId })
        .$returningId();

      const newPost = await db.query.postsTable.findFirst({
        where: eq(postsTable.id, insertedPost.id),
      });

      return res.status(201).json({
        success: true,
        message: "Image post siccessfully",
        data: {
          post: newPost,
        },
      });
    } catch (error) {
        console.error("Failed to post image,error : ", error)
        return res.status(201).json({
            success: false,
            message: "Terjadi kesalahan pada server",
            error : error instanceof Error ? error.message : error,
        })
    }
  };
}

export default new PostController();
