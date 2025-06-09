
// No global types strictly needed for this specific simple version,
// but this file is here for scalability.
// For example, if we had complex objects shared across components:
// export interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
// }

// You can define types for API responses if they are complex and you want to ensure type safety
// For example, if Gemini returned a specific JSON structure beyond simple text.
// For this app, Gemini returns text (string) or HTML (string), which are handled directly.
