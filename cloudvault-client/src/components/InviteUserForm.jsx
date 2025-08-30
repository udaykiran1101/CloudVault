// src/components/InviteUserForm.jsx
import React, { useState } from 'react';
import { supabase } from '../supabase';

function InviteUserForm({ project }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();
    setStatus('');

    // 🔍 Get user by email
    const { data: userData, error: userError } = await supabase
      .from('profiles') // or use supabase.auth.admin.getUserByEmail if using server role key
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      setStatus('❌ User not found.');
      return;
    }

    // ✅ Add to project_members table
    const { error: inviteError } = await supabase.from('project_members').insert({
      project_id: project.id,
      user_id: userData.id,
    });

    if (inviteError) {
      setStatus('❌ Failed to invite: ' + inviteError.message);
    } else {
      setStatus('✅ User invited to project!');
      setEmail('');
    }
  };

  return (
    <form className="mt-3" onSubmit={handleInvite}>
      <h5>Invite a User to this Project</h5>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-outline-primary" type="submit">
          Invite
        </button>
      </div>
      {status && <div className="alert alert-info">{status}</div>}
    </form>
  );
}

export default InviteUserForm;
