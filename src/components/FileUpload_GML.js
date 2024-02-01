// components/GraphUploadComponent.js

import React, { useState } from 'react';

const GraphUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const allowedFileExtensions = [
        '.json',
    ]

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        // Implement file upload logic here
        console.log('Uploading file:', selectedFile);
    };

    const handleCancel = () => {
        setSelectedFile(null);
    };

    return (
        <div className="w-full max-w-md shadow-lg rounded px-8 pt-2 pb-8 hover:shadow-2xl transition duration-500 ease-in-out bg-white">
            <div className="flex flex-col items-center justify-center">
                <p className="text-lg mb-4">Upload GraphML File for Visualisation</p>
            </div>
            {!selectedFile && (
                <div className='flex gap-4 items-center justify-center'>
                    <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        onChange={handleFileChange}
                        accept={allowedFileExtensions.join(',')}
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Select GRAPHML File
                    </label>
                </div>
            )}
            {selectedFile && (
                <div>
                    <p>Selected File: {selectedFile.name}</p>
                    <div className="flex justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GraphUploadComponent;
