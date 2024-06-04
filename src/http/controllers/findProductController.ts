import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function findProductController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const createBodyShema = z.object({
    id: z.number(),
  });

  const { id } = createBodyShema.parse(req.params);

  const userReponse = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!userReponse) {
    res.status(404).send({ message: "Product not found" });
  }

  res.status(201).send(userReponse);
}
