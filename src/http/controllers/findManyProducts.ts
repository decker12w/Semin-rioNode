import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function findManyProducts(req: FastifyRequest, res: FastifyReply) {
  const querySchema = z.object({
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    minQuantity: z.number().int().optional(),
  });

  const parsedQuery = querySchema.parse(req.query);

  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: parsedQuery.minPrice,
          lte: parsedQuery.maxPrice,
        },
        quantity: {
          gte: parsedQuery.minQuantity,
        },
      },
    });

    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching products" });
  }
}
