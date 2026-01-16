import { describe, it, expect, vi, beforeEach } from "vitest";
import { auth } from "../../lib/auth";
import { adminMiddleware } from "../../middleware/admin-middleware";

describe("Admin Middleware", () => {
  let request: any;
  let reply: any;

  beforeEach(() => {
    request = {
      headers: {},
    };

    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    vi.clearAllMocks();
  });

  type GetSessionResponse = Awaited<ReturnType<typeof auth.api.getSession>>;

  it("should return 200 if user is a admin", async () => {
    const session: GetSessionResponse = {
      session: {
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "1",
        expiresAt: new Date(),
        token: "token",
      },

      user: {
        id: "2",
        name: "Test 2",
        email: "test2@gmail.com",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true,
        banned: false,
      },
    };

    vi.spyOn(auth.api, "getSession").mockResolvedValue(session);

    await adminMiddleware(request, reply);

    expect(request.user).toEqual(session.user);
    expect(reply.status).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });

  it("should return 401 if user is not a admin", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValue(null);

    await adminMiddleware(request, reply);

    expect(request.user).toBeUndefined();
    expect(reply.status).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({
      message: "You are not authenticated",
    });
  });

  it("should return 403 if user is not a admin", async () => {
    const session: GetSessionResponse = {
      session: {
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "1",
        expiresAt: new Date(),
        token: "token",
      },

      user: {
        id: "2",
        name: "Test 2",
        email: "test2@gmail.com",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true,
        banned: false,
      },
    };

    vi.spyOn(auth.api, "getSession").mockResolvedValue(session);

    await adminMiddleware(request, reply);
    expect(reply.status).toHaveBeenCalledWith(403);
    expect(reply.send).toHaveBeenCalledWith({
      message: "You are not authorized",
    });
  });

  it("should return 500 if middleware fails", async () => {
    vi.spyOn(auth.api, "getSession").mockRejectedValue("Internal server error");

    await adminMiddleware(request, reply);

    expect(request.session).toBeUndefined();
    expect(request.user).toBeUndefined();
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});
