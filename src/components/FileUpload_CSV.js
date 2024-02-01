// components/FileUploadComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from "./Dropdown";

// corshas been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

const API_URL = 'http://127.0.0.1:5000';

const algorithmOptions = [
  { label: 'Louvain', value: 'louvain' },
  { label: 'Label Propagation', value: 'lpa' },
  { label: 'Greedy Modularity Optimisation', value: 'greedy_modularity' }
]

const FileUploadComponent = ({setGraphData}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [convertedFileName, setConvertedFileName] = useState(null);

  const [algoRunSuccess, setAlgoRunSuccess] = useState(false);

  const [selectedAlgo, setSelectedAlgo] = useState(null);

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const allowedFileExtensions = [
    '.csv',
  ]

  useEffect(() => {
    if (uploadSuccess) {
      axios
        .post(`${API_URL}/convert`, {
          'fname': fileName,
          'type': 'QP'
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        })
        .then((response) => {
          console.log('File converted successfully');
          console.log(response.data)
          setConvertedFileName(response.data['fname']);
        })
        .catch((error) => {
          console.log('File conversion failed');
        });
    }
  }, [uploadSuccess])

  useEffect(() => {
    if (downloadSuccess) {
      setAlgoRunSuccess(false)
      setFileName(null)
      setConvertedFileName(null)
      setSelectedFile(null)
      setUploadSuccess(false)
      setSelectedAlgo(null)
    }
  })

  const handleFileChange = (e) => {
    if (downloadSuccess) setDownloadSuccess(false)
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // post with axios
    console.log(selectedFile)
    const formData = new FormData();
    formData.append('file', selectedFile);
    setFileName(selectedFile.name);

    // allow CORS
    axios
      .post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully');
        setSelectedFile(null);
        setUploadSuccess(true)
      })
      .catch((error) => {
        alert('File upload failed');
      });
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const handleRunAlgo = () => {
    console.log(selectedAlgo)
    console.log(convertedFileName)

    axios
      .post(`${API_URL}/community`, {
        'fname': convertedFileName,
        'algo': selectedAlgo.value
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((response) => {
        console.log('Algo run successfully');
        console.log(response.data)
        setAlgoRunSuccess(true)
      })
      .catch((error) => {
        alert('Algo failed');
      });
  }

  const handleDownload = () => {
    console.log(convertedFileName)
    axios
      .get(`${API_URL}/export?fname=${convertedFileName}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        })
      .then((response) => {
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', `${convertedFileName}`);
        // document.body.appendChild(link);
        // link.click();
        console.log(response.data)
        // convert the json to normal js object
        setGraphData(response.data)
        setDownloadSuccess(true)
      })
      .catch((error) => {
        console.log(error)
        console.log('File download failed');
      });
  }

  return (
    <div className="w-full max-w-md shadow-lg rounded px-8 pt-6 pb-8 hover:shadow-2xl transition duration-500 ease-in-out bg-white">
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg mb-4">Upload CSV for Running CD/II Algorithms</p>
      </div>
      {!algoRunSuccess && (
        <>
          {!uploadSuccess && (
            <>
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
                    Select CSV File
                  </label>
                </div>
              )}
              {selectedFile && (
                <div className='flex flex-col gap-4 items-center justify-center'>
                  <p className="text-sm mt-0">
                    Selected File: {selectedFile.name}
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
            </>
          )}
          {convertedFileName && (
            <div className='flex flex-col gap-4 items-center justify-center'>
              <div className='flex flex-col items-center justify-center'>
                <p className="text-sm mt-0">File uploaded & converted successfully</p>
                <p className="text-sm mt-0 text-blue-500">File Name: {fileName}</p>
              </div>
              <Dropdown options={algorithmOptions} selectedOption={selectedAlgo} setSelectedOption={setSelectedAlgo} handleSubmit={handleRunAlgo} />
            </div>
          )}
        </>
      )}
      {algoRunSuccess && (
        <div className='flex flex-col gap-4 items-center justify-center'>
          <p className="text-sm mt-0">{`${selectedAlgo.label} algorithm run successfully`}</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Process graph for viewing
          </button>
        </div>

      )}
    </div>
  );
}

export default FileUploadComponent;