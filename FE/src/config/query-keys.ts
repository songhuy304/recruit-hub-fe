export const QUERY_KEY = {
  AUTH: {
    ME: ["auth", "me"],
  },

  USER: {
    ROOT: "user",
    INFO: ["user", "info"],
    LIST: ["user", "list"],
  },

  TEAM: {
    ROOT: "team",
    INFO: ["team", "info"],
    LIST: ["team", "list"],
    STATISTICS: (id: number) => ["team", "statistics", id],
    MEMBERS: (id: number) => ["team", "members", id],
    JOIN_REQUESTS: (id: number) => ["team", "join-requests", id],
  },
} as const;
