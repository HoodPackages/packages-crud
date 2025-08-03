import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const API_UPLOAD_URL = "https://packages-server-75ra.onrender.com/api/upload";

export default function FileDropzone() {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles || acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        setError(null);
        setFileName(null);

        try {
            const response = await fetch(API_UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();

            setFileName(data.fileName || file.name); // если сервер возвращает имя
        } catch (err) {
            setError("Ошибка при загрузке файла");
            console.error("Upload error:", err);
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ['.xlsx'],
            "application/vnd.ms-excel": ['.xls']
        },
    });

    return (
        <div className="max-w-md mx-auto mt-8">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition 
                ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Отпустите файл сюда...</p>
                ) : (
                    <p className="text-gray-500">Перетащите файл Excel сюда или нажмите, чтобы выбрать</p>
                )}
            </div>

            {uploading && <p className="mt-2 text-sm text-gray-600">Загрузка...</p>}
            {fileName && <p className="mt-2 text-sm text-green-600">✅ Загружено: {fileName}</p>}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}
