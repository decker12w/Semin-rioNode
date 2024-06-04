import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function createController(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number().int().optional(),
  });

  const parsedBody = createBodySchema.parse(req.body);

  try {
    // Verifica se já existe um produto com o mesmo nome
    const existingProduct = await prisma.product.findUnique({
      where: { name: parsedBody.name },
    });

    if (existingProduct) {
      return res
        .status(409)
        .send({ error: "Product with the same name already exists" });
    }

    // Cria o novo produto se não houver duplicata
    const productResponse = await prisma.product.create({
      data: {
        name: parsedBody.name,
        price: parsedBody.price,
        quantity: parsedBody.quantity,
      },
    });

    res.status(201).send(productResponse);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the product" });
  }
}
