import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function deleteById(req: FastifyRequest, res: FastifyReply) {
  const deleteParamsSchema = z.object({
    id: z.number().int(),
  });

  const parsedParams = deleteParamsSchema.parse(req.params);

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: parsedParams.id },
    });

    if (!existingProduct) {
      res.status(404).send({ error: "Product not found" });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: parsedParams.id },
    });

    res
      .status(200)
      .send({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .send({ error: "An error occurred while deleting the product" });
  }
}
