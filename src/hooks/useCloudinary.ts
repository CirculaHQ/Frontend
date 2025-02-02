import {
  CloudinaryError,
  CloudinaryUploadResponse,
  UploadOptions,
  uploadToCloudinary,
} from '@/utils/cloudinary-helper';
import { useState } from 'react';

interface UseCloudinaryUploadProps {
  options?: UploadOptions;
}

interface UseCloudinaryUploadReturn {
  uploadImage: (file: File) => Promise<CloudinaryUploadResponse | CloudinaryError>;
  isUploading: boolean;
  error: string | null;
}

export function useCloudinaryUpload({
  options,
}: UseCloudinaryUploadProps): UseCloudinaryUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadToCloudinary(file, options);

      if ('message' in result) {
        setError(result.message);
        throw new Error(result.message);
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, error };
}

//SAMPLE USE

// src/components/ImageUpload.tsx
// import React, { useState } from 'react';
// import { useCloudinaryUpload } from '../utils/cloudinaryHelper';

// interface ImageUploadProps {
//   onUploadSuccess?: (imageUrl: string) => void;
//   onUploadError?: (error: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, onUploadError }) => {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const { uploadImage, isUploading, error } = useCloudinaryUpload({
//     cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || '',
//     options: {
//       folder: 'my-app-uploads',
//       transformation: {
//         width: 800,
//         height: 800,
//         crop: 'limit',
//         quality: 80
//       },
//       maxFileSize: 5 * 1024 * 1024, // 5MB
//       allowedFormats: ['jpg', 'jpeg', 'png', 'webp']
//     }
//   });

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Create preview
//     const objectUrl = URL.createObjectURL(file);
//     setPreviewUrl(objectUrl);

//     try {
//       const result = await uploadImage(file);

//       if ('secure_url' in result) {
//         onUploadSuccess?.(result.secure_url);
//       } else {
//         onUploadError?.(result.message);
//       }
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Upload failed';
//       onUploadError?.(errorMessage);
//     }

//     // Cleanup preview URL
//     return () => URL.revokeObjectURL(objectUrl);
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="mb-4">
//         <label
//           htmlFor="image-upload"
//           className="block p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
//         >
//           <input
//             id="image-upload"
//             type="file"
//             className="hidden"
//             accept="image/*"
//             onChange={handleFileChange}
//             disabled={isUploading}
//           />
//           <div className="text-center">
//             {isUploading ? (
//               <p>Uploading...</p>
//             ) : (
//               <p>Click or drag image to upload</p>
//             )}
//           </div>
//         </label>
//       </div>

//       {previewUrl && (
//         <div className="mt-4">
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="w-full h-48 object-cover rounded-lg"
//           />
//         </div>
//       )}

//       {error && (
//         <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

// import ImageUpload from './components/ImageUpload';

// function App() {
//   const handleUploadSuccess = (imageUrl: string) => {
//     console.log('Uploaded image URL:', imageUrl);
//   };

//   const handleUploadError = (error: string) => {
//     console.error('Upload error:', error);
//   };

//   return (
//     <ImageUpload
//       onUploadSuccess={handleUploadSuccess}
//       onUploadError={handleUploadError}
//     />
//   );
// }
