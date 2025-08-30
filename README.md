## Project Description

CloudVault is a cloud-based file storage and sharing application, inspired by Google Drive. It allows users to create projects (folders), upload and manage files, and collaborate with other users in real time. The app is built with React and uses Supabase for authentication, database, and file storage.

## Features

- **User Authentication:** Sign up, log in, and log out securely using Supabase Auth.
- **Project Management:** Create new projects, view existing ones, and manage project membership.
- **File Storage:** Upload, list, download, and delete files within projects using Supabase Storage.
- **Collaboration:** Invite other users to join projects and share access to files.
- **Responsive UI:** Built with React, Bootstrap, and Tailwind CSS for a modern user experience.

## Tech Stack

- **Frontend:** React, React Router, Bootstrap, Tailwind CSS
- **Backend:** Supabase (Auth, Database, Storage)


## Getting Started

### Prerequisites

- Node.js and npm installed
- Supabase project set up (get your Supabase URL and anon key)

### Installation

1. Clone the repository:
   ```zsh
   git clone https://github.com/udaykiran1101/CloudVault.git
   cd CloudVault/cloudvault-client
   ```

2. Install dependencies:
   ```zsh
   npm install
   ```

3. Configure Supabase:
   - Update `src/supabase.js` with your Supabase project URL and anon key.

4. Start the development server:
   ```zsh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
cloudvault-client/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── CreateProjectForm.jsx
  │   │   ├── FileList.jsx
  │   │   ├── InviteUserForm.jsx
  │   │   ├── ProjectSelector.jsx
  │   │   └── UploadForm.jsx
  │   ├── pages/
  │   │   ├── Dashboard.jsx
  │   │   ├── LoginPage.jsx
  │   │   └── SignupPage.jsx
  │   ├── utils/
  │   │   └── auth.js
  │   ├── supabase.js
  │   └── App.jsx
  ├── package.json
  └── README.md
```

## Usage

1. **Sign Up:** Create a new account.
2. **Log In:** Access your dashboard.
3. **Create Project:** Start a new project to organize your files.
4. **Upload Files:** Add files to your project.
5. **Invite Users:** Collaborate by inviting others to your project.
6. **Manage Files:** Download or delete files as needed.

## Supabase Setup

- **Tables:** `projects`, `project_members`, `profiles`
- **Storage Bucket:** `project-files`

Refer to Supabase documentation for details on setting up tables and storage.

## License

This project is licensed under the MIT License.

---

*CloudVault - Your personal cloud storage solution!*
