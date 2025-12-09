import { describe, it, expect, vi, beforeEach } from "vitest";
import { auth } from "../../lib/auth";
import { Session } from "better-auth/types";
import { sessionMiddleware } from "../../middleware/session-middleware";

describe("Session Middleware", () => {
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

  it("should return 200 if session is valid", async () => {
    const session: Session = {
      user: {
        id: "1",
        email: "useremail@test.com",
      },
    };

    vi.spyOn(auth.api, "getSession").mockResolvedValue(session);

    await sessionMiddleware(request, reply);

    expect(request.session).toEqual(session);
    expect(request.user).toEqual(session.user);
    expect(reply.status).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });

  it("should return 401 if session is not valid", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValue(null);

    await sessionMiddleware(request, reply);

    expect(request.session).toBeUndefined();
    expect(request.user).toBeUndefined();
    expect(reply.status).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({
      message: "You are not authenticated",
    });
  });

  it("should return 500 if middleware fails", async () => {
    vi.spyOn(auth.api, "getSession").mockRejectedValue("Internal server error");

    await sessionMiddleware(request, reply);

    expect(request.session).toBeUndefined();
    expect(request.user).toBeUndefined();
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});
