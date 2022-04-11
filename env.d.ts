interface ImportMetaEnv {
    readonly PUBLIC_CLOUDINARY_URL: string;
    readonly SENDGRID_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }