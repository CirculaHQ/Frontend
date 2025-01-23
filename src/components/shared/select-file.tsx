import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui";

interface Props {
    onSelect: (e: any) => void,
    fileTypes?: string
}

export const SelectFile = ({ onSelect, fileTypes }: Props) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const generatePreview = async (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string); // Resolve with the data URL
            reader.onerror = () => reject(new Error("Failed to generate preview"));
            reader.readAsDataURL(file); // Read the file as a data URL
        });
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        let preview

        if (file) {
            try {
                preview = await generatePreview(file);
            } catch (error) {
                console.error("Error generating preview:", error);
            }

            setSelectedFile(file);
            onSelect?.({ file, preview });
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        setSelectedFile(null);
        onSelect?.({ file: "", preview: "" })
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            {!selectedFile ?
                <Button type="button" className='w-fit mb-1' onClick={handleButtonClick}>Upload image</Button> :
                <Button type="button" className='w-fit mb-1' onClick={handleRemove}>Remove</Button>
            }
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={fileTypes}
                onChange={handleFileChange}
            />
        </div>
    )
}