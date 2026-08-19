# Admin Panel & Cloud Storage Setup Guide

This guide details how to set up, configure, and maintain the **Admin Panel**, **MongoDB Atlas Database**, and **Cloudinary Image Storage** for Kovai Safety Nets.

---

## 1. Environment Variables Configuration

Create a file named `.env.local` in the root of the project directory (`kovai-safety-nets/.env.local`) with the following key-value pairs:

```env
# MongoDB Atlas Connection String (Database Name: kovai_safety_nets)
MONGODB_URI="mongodb+srv://<db_user>:<db_password>@cluster0.mzxn3eq.mongodb.net/kovai_safety_nets?retryWrites=true&w=majority&appName=Cluster0"

# Cloudinary Account Credentials
CLOUDINARY_CLOUD_NAME="<your_cloudinary_cloud_name>"
CLOUDINARY_API_KEY="646959251174412"
CLOUDINARY_API_SECRET="DcuuViRoPqsN5vWv7YYPxVM0-lg"

# NextAuth Configuration
NEXTAUTH_SECRET="<generate_a_random_32_character_string>"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 2. How to Set Up Free MongoDB Atlas Cluster (M0 Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account.
2. Click **Create a Deployment** and choose **M0 Free Tier** (512MB storage, free forever).
3. Select your preferred Cloud Provider (AWS/GCP) and Region (e.g. `ap-south-1` Mumbai for fastest TN access).
4. Under **Database Access**, create a database user:
   - **Username**: e.g., `dudaprasad12345_db_user`
   - **Password**: Auto-generate or set a strong password.
5. Under **Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`) so Vercel/Next.js can connect.
6. Click **Connect** -> **Drivers** -> **Node.js** and copy your `MONGODB_URI`. Append `/kovai_safety_nets` to specify the database.

---

## 3. How to Set Up Free Cloudinary Media Storage (25GB Free Tier)

1. Go to [Cloudinary](https://cloudinary.com/users/register_free) and sign up for a free account.
2. In your Cloudinary Dashboard, locate:
   - **Cloud Name**: (e.g. `dudaprasad12345` or your account identifier)
   - **API Key**: `646959251174412`
   - **API Secret**: `DcuuViRoPqsN5vWv7YYPxVM0-lg`
3. Enter these credentials in `.env.local` or your production environment variables (e.g. Vercel Project Settings).
4. All gallery & blog uploads automatically store images in dedicated folders:
   - `kovai-safety-nets/gallery`
   - `kovai-safety-nets/blog`

---

## 4. Seeding Initial Data & Admin Credentials

To automatically seed the initial admin account, initial blog posts, and upload existing service photos to Cloudinary & MongoDB, run:

```bash
npx tsx scripts/seed.ts
```

### Initial Admin Credentials:
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@kovaisafetynets.com`
- **Password**: `Admin@Kovai2026`

*(Password is securely hashed with `bcryptjs` in the `admins` MongoDB collection).*

---

## 5. Admin Panel Features

- **Dashboard** (`/admin`): Visual counts of total blog posts, published items, drafts, and Cloudinary gallery photos.
- **Blog Management** (`/admin/blog`):
  - **Create Post** (`/admin/blog/new`): Auto-generated slug, Cloudinary cover image upload, draft/publish toggle, markdown text editor.
  - **Edit Post** (`/admin/blog/[id]`): Pre-filled form to update content or swap cover images.
  - **Delete Post**: Deletes post document and cleans up cover image from Cloudinary using `coverImagePublicId`.
- **Gallery Management** (`/admin/gallery`):
  - Multi-file drag & drop image upload directly to Cloudinary.
  - Grid view of all photos with upload timestamps and captions.
  - Destroy-first delete action: calls Cloudinary's `destroy` API **first** before deleting the MongoDB record to prevent orphaned database entries.
