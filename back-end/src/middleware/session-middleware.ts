import { FastifyRequest, FastifyReply } from "fastify";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

declare module "fastify" {
  interface FastifyRequest {
    session?: any;
    user?: any;
  }
}

export const sessionMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session) {
      return reply.status(401).send({
        message: "You are not authenticated",
      });
    }

    request.session = session;
    request.user = session.user;
  } catch (err) {
    return reply.status(500).send({
      message: "Internal server error",
      error: err,
    });
  }
};
