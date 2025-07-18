const en = {
  common: {
    search: "Search",
    filter: "Filter",
    back: "Back",
    loading: "Loading...",
    error: "Error",
    retry: "Try again",
    viewDetails: "View details",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
  },
  tabs: {
    ads: "Displays",
    chat: "Chat",
    preview: "Preview",
  },
  ads: {
    title: "Displays",
    searchPlaceholder: "Search ads...",
    noResults: "No ads found",
    status: {
      active: "Active",
      paused: "Paused",
      completed: "Completed",
    },
    metrics: {
      impressions: "Impressions",
      clicks: "Clicks",
      ctr: "CTR",
      spend: "Spend",
      conversions: "Conversions",
    },
    details: {
      title: "Ad Details",
      campaign: "Campaign",
      performance: "Performance",
      insights: "Insights",
    },
  },
  chat: {
    title: "AI Chat",
    placeholder: "Type your message...",
    send: "Send",
    thinking: "Thinking...",
    welcome: "Hello! How can I help you today?",
  },
  preview: {
    title: "Preview",
    activeAd: "Active Ad",
    cameraPreview: "Camera Preview",
    noActiveAd: "No active ad selected",
    cameraError: "Error accessing camera",
  },
  settings: {
    language: "Language",
    portuguese: "Português",
    english: "English",
  },
} as const;

export default en;
