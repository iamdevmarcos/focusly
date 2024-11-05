export const kbarActions = [
  {
    id: "play",
    name: "-> Start Session",
    section: "commands",
    shortcut: ["p"],
    keywords: "play, play timer, start",
    perform: () => alert("click"),
  },
  {
    id: "pause",
    name: "-> Pause Session",
    section: "commands",
    shortcut: ["p"],
    keywords: "pause, pause timer",
    perform: () => alert("click"),
  },
  {
    id: "reset",
    name: "-> Reset Session",
    section: "commands",
    shortcut: ["r"],
    keywords: "reset",
    perform: () => alert("click"),
  },
  {
    id: "create_task",
    name: "-> Create new task",
    section: "commands",
    keywords: "create",
    perform: () => alert("click"),
  },
];
