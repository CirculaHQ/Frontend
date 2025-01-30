import CONFIG from './config';

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  original_filename: string;
  created_at: string;
  resource_type: string;
  tags?: string[];
  url: string;
}

export interface CloudinaryError {
  message: string;
  error?: any;
}

export interface UploadOptions {
  folder?: string;
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
  };
  maxFileSize?: number; // in bytes
  allowedFormats?: string[];
}

const defaultOptions: UploadOptions = {
  folder: 'uploads',
  transformation: {
    width: 1000,
    height: 1000,
    crop: 'limit',
    quality: 85,
  },
  maxFileSize: 10485760, // 10MB
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
};

export async function uploadToCloudinary(
  file: File,
  options: UploadOptions = defaultOptions
): Promise<CloudinaryUploadResponse | CloudinaryError> {
  try {
    // Validate file size
    if (options.maxFileSize && file.size > options.maxFileSize) {
      throw new Error(`File size exceeds ${options.maxFileSize / 1048576}MB limit`);
    }

    // Validate file format
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (options.allowedFormats && !options.allowedFormats.includes(fileExtension || '')) {
      throw new Error(
        `File format not supported. Allowed formats: ${options.allowedFormats.join(', ')}`
      );
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CONFIG.CLOUDINARY_PRESET);

    if (options.folder) {
      formData.append('folder', options.folder);
    }

    if (options.transformation) {
      Object.entries(options.transformation).forEach(([key, value]) => {
        if (value) formData.append(key, value.toString());
      });
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image');
    }

    const data = await response.json();
    return data as CloudinaryUploadResponse;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'An unknown error occurred', error };
  }
}
