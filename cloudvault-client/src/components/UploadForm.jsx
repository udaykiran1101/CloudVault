// src/components/UploadForm.jsx
import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

function UploadForm({ user,project ,onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !user) {
      setStatus('Please select a file and ensure user is logged in.');
      return;
    }

   // const filePath = `${user.id}/${file.name}`;

    
    const { data, error } = await supabase.storage
  .from('project-files') // change this if you're still using 'user-files'
  .upload(`projects/${project.id}/${file.name}`, file, {
    cacheControl: '3600',
    upsert: true,
  });
    if (error) {
      console.error(error);
      setStatus('❌ Upload failed: ' + error.message);
    } else {
      setStatus('✅ File uploaded successfully!');
      onUploadComplete?.(); // Call the callback if provided
    }
  };

  return (
    <div className="container mt-4">
      <h3>Upload File</h3>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>

      {status && (
        <div className="alert mt-3 alert-info" role="alert">
          {status}
        </div>
      )}
    </div>
  );
}

export default UploadForm;
