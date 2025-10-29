import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

import { authRoutes } from "./routes/auth-routes";
import { productRoutes } from "./routes/product-routes";
import multipart from "@fastify/multipart";
import { appointmentRoutes } from "./routes/appointments/user-appointment-routes";

dotenv.config();

const port = Number(process.env.PORT) || 8000;

const fastify = Fastify({
  logger: true,
});

fastify.register(multipart);

fastify.register(cors, {
  origin: process.env.ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

fastify.register(authRoutes);

fastify.register(productRoutes, {
  prefix: "/api",
});

fastify.register(appointmentRoutes, {
  prefix: "/api",
});

fastify
  .listen({ port, host: "0.0.0.0" })
  .then(() => {
    console.log(`Server running on port ${port}`);
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
