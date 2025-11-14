# FitTree Links

FitTree Links is a responsive **link-in-bio web application** similar to Linktree. Users can create a personal landing page with multiple links to their social media, websites, and content, all accessible via a single, shareable handle.

---

## Features

* Claim a unique handle for your FitTree page
* Add multiple links to social media, websites, blogs, or any URL
* Upload a profile picture
* Add a short description or bio
* Responsive design for desktop, tablet, and mobile
* Dynamic routing for each handle like `/generate?handle=username`

---

## Technologies Used

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** Node.js API routes
* **Database:** MongoDB
* **File Uploads:** Cloudinary
* **Notifications:** React Toastify

---

## Installation

1. Clone the repository:

```bash
git clone [https://github.com/yourusername/fitTree-links.gi](https://github.com/razaahmad0192/fitTree-links.git
cd fitree-links
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file and add:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_DOMAIN=http://localhost:3000 OR Your Domain After Deploying
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Usage

1. Go to the homepage.
2. Enter a unique handle and click **Claim your FitTree**.
3. Add links with platform selection.
4. Upload a profile picture and add a description.
5. Click **Create your FitTree** to generate your personal landing page.

---

## Folder Structure

```
fitree-links/
│
├─ /app               # Next.js pages and components
├─ /components        # Reusable components (Navbar, LinkCard, etc.)
├─ /lib               # MongoDB client, utility functions
├─ /public            # Images, icons, static files
├─ /pages/api          # Backend API routes (upload, add, delete)
├─ package.json       # Project dependencies and scripts
├─ tailwind.config.js # Tailwind configuration
├─ README.md          # Project documentation
```

---

## License

This project is licensed under the MIT License.
