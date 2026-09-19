# Vercel Deployment Guide

## Quick Start

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect the `vercel.json` configuration
   - Click "Deploy"

That's it! Your site will be live in minutes.

## Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Automatic Deployments

- Every push to `main` branch automatically deploys to production
- Pull requests get preview deployments
- Rollback to any previous deployment with one click

## Build Settings (Already Configured)

The `vercel.json` file contains:
- Build command: `cd artifacts/portfolio-site && pnpm run build`
- Output directory: `artifacts/portfolio-site/dist/public`
- Install command: `pnpm install`

## Troubleshooting

### Build fails with "command not found"
- Make sure pnpm is available (Vercel includes it by default)

### Environment variables needed
- Add them in Project Settings → Environment Variables
- Redeploy after adding variables

### Wrong directory being deployed
- Check that vercel.json is in the project root
- Verify outputDirectory path is correct

## Alternative: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Performance Tips

- Enable Vercel Analytics in project settings
- Use Vercel's Edge Network for global CDN
- Enable automatic image optimization (if using images)

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
