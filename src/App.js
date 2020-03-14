import React, { useState } from 'react';

function App() {
  let [fileURL, setFileURL] = useState(null);
  let [fileName, setFileName] = useState(null);

  const handleChange = item => {
    const uploadedFile = item.nativeEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsText(uploadedFile);

    reader.onload = function() {
      const blob = new Blob(
        [
          `${reader.result}
          \n Name: ${uploadedFile.name};
          \n Size: ${uploadedFile.size} bites;
          \n Last Modified: ${uploadedFile.lastModifiedDate};`
        ],
        { type: 'text/plain' }
      );
      const url = URL.createObjectURL(blob);
      setFileURL(url);
      setFileName(uploadedFile.name);
    };

    reader.onerror = function() {
      console.log(reader.error);
    };
  };

  return (
    <div className="App">
      <div className="inputDiv">
        <input
          type="file"
          id="file"
          onChange={handleChange}
          className="inputfile"
        ></input>
        <label htmlFor="file">
          {fileName ? 'File selected' : 'Choose a file...'}
        </label>
        <a
          href={fileURL}
          download={`${fileName}`}
          className={fileName ? 'btn' : 'hidden'}
        >
          Download file
        </a>
      </div>
    </div>
  );
}

export default App;
