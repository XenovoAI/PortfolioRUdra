# Personal Portfolio Website

A modern portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Deploying to Vercel

### Prerequisites
- A [Vercel account](https://vercel.com/signup)
- Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your Git repository

5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `cd artifacts/portfolio-site && pnpm run build`
   - **Output Directory**: `artifacts/portfolio-site/dist/public`
   - **Install Command**: `pnpm install`

6. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   vercel
   ```

4. Follow the prompts and your site will be deployed!

### Environment Variables

If your project requires environment variables, add them in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables (e.g., API keys, database URLs)

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   cd artifacts/portfolio-site
   pnpm run dev
   ```

3. Open your browser and visit `http://localhost:5173`

## 📦 Building for Production

```bash
pnpm run build
```

The built files will be in `artifacts/portfolio-site/dist/public`

## 🔧 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **Radix UI** - Accessible components

## 📝 Project Structure

```
├── artifacts/
│   └── portfolio-site/     # Main application
│       ├── src/            # Source files
│       ├── public/         # Static assets
│       └── dist/           # Build output
├── lib/                    # Shared libraries
└── vercel.json            # Vercel configuration
```

## 🤝 Support

For deployment issues, check the [Vercel documentation](https://vercel.com/docs) or open an issue in this repository.
