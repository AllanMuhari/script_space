import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadUserImage = async (req, res) => {
  const { userId } = req.user;
  const { filename } = req.file;

  try {
    const imageUrl = `/uploads/${filename}`;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { imageUrl },
    });
    res.json({ imageUrl: user.imageUrl });
  } catch (error) {
    res.status(400).json({ error: "Failed to upload image" });
  }
};
