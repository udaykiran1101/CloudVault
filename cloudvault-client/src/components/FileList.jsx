// src/components/FileList.jsx
import React, { useEffect, useState , forwardRef,useImperativeHandle} from 'react';
import { supabase } from '../supabase';

function FileList({ user,project,ref }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);

    const { data, error } = await supabase.storage
      .from('project-files') // Change this if your bucket name is different
      .list(`projects/${project.id}/`,{ limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) {
      console.error('Error fetching files:', error.message);
    } else {
      setFiles(data);
    }

    setLoading(false);
  };
  useImperativeHandle(ref, () => ({
    refresh: fetchFiles,
  }));
  const downloadFile = async (fileName) => {
    const { data, error } = await supabase.storage
      .from('project-files')
      .createSignedUrl(`projects/${project.id}/${fileName}`, 60);

    if (error) {
      alert('Error generating download link.');
    } else {
      window.open(data.signedUrl, '_blank');
    }
  };

  const deleteFile = async (fileName) => {
    const { error } = await supabase.storage
      .from('project-files')
      .remove([`projects/${project.id}/${fileName}`]);

    if (error) {
      alert('Error deleting file: ' + error.message);
    } else {
      alert('✅ File deleted');
      fetchFiles(); // Refresh the list
    }
  };
  useEffect(() => {
    if (user && project) fetchFiles();
  }, [user,project]);

  if (loading) return <p>Loading files...</p>;

  return (
    <div className="container mt-4">
      <h4>Your Files</h4>
      {files.length === 0 ? (
        <p className="text-muted">No files uploaded yet.</p>
      ) : (
        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.name}>
                <td>{file.name}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => downloadFile(file.name)}
                  >
                    View/Download
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() =>
                      window.confirm('Are you sure?') &&
                      deleteFile(file.name)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FileList;
