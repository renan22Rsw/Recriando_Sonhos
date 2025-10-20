import { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export const adminMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (session?.user.role !== "admin") {
      return reply.status(403).send("You are not authorized");
    }

    request.user = session.user;
  } catch (err) {
    return reply.status(500).send({
      message: "Internal server error",
      error: err,
    });
  }
};
