// Global type declarations for Clerk
declare global {
  interface Window {
    Clerk: {
      user: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        imageUrl: string;
        emailAddresses: Array<{
          emailAddress: string;
          id: string;
        }>;
      } | null;
      loaded: boolean;
      signOut: () => Promise<void>;
    };
  }
}

export {};
