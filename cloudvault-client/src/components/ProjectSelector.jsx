import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function ProjectSelector({ onProjectSelect }) {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', user.id);

    if (error) {
      console.error('Error fetching projects:', error.message);
    } else {
      setProjects(data);
      if (data.length > 0) {
        setSelected(data[0]); // default select first
        if (onProjectSelect) onProjectSelect(data[0]);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const proj = projects.find((p) => p.id === e.target.value);
    setSelected(proj);
    if (onProjectSelect) onProjectSelect(proj);
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="container mt-3">
      <label className="form-label">Select Project</label>
      <select
        className="form-select"
        value={selected?.id || ''}
        onChange={handleChange}
      >
        {projects.map((proj) => (
          <option key={proj.id} value={proj.id}>
            {proj.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProjectSelector;
