import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.listen({ port: 8000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at http://localhost:8000`);
});
