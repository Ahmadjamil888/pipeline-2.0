# Vercel Deployment with npm - Setup Instructions

## Important: Configure Vercel Project Root Directory

Since this is a monorepo, you need to set the **Root Directory** in Vercel project settings to the **root of the repository** (not `apps/web`).

### Steps:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (`web`)
3. **Go to Settings** → **General**
4. **Find "Root Directory"** section
5. **Set Root Directory to**: `.` (root of the repo) or leave empty
6. **Save**

### Alternative: Use Vercel CLI

```bash
cd supavec
vercel project ls
# Note your project name, then:
vercel project --help
# You may need to update via dashboard
```

## Updated Build Configuration

The `vercel.json` files have been updated to use npm instead of bun:

- **Root `vercel.json`**: Uses npm commands from root directory
- **`apps/web/vercel.json`**: Uses npm commands (assumes root is set in Vercel)

## Build Commands

With root directory set to repo root:
- **Install**: `npm install` (from root)
- **Build**: `npm run build -- --filter=@supavec/web` (from root)
- **Output**: `apps/web/.next`

## Testing Locally

Before deploying, test the build:

```bash
cd supavec
npm install
npm run build -- --filter=@supavec/web
```

## Workspace Protocol Note

The project uses `workspace:*` in package.json dependencies. This works with:
- **npm 7+** (with workspaces enabled)
- **pnpm** (native support)
- **yarn** (native support)
- **bun** (native support)

If npm doesn't work, you may need to:
1. Update npm: `npm install -g npm@latest`
2. Or use pnpm: `npm install -g pnpm && pnpm install`

## Deployment Steps

1. **Set Root Directory** in Vercel dashboard (as described above)
2. **Push changes** to GitHub
3. **Vercel will auto-deploy** or trigger manually
4. **Check build logs** if there are issues

## Environment Variables

Make sure all environment variables are set in Vercel:
- Go to **Settings** → **Environment Variables**
- Add all variables from `apps/web/.env.local`

## Troubleshooting

### Error: "Bun could not find a package.json"
- **Solution**: Set Root Directory to `.` (root) in Vercel project settings

### Error: "Unsupported URL Type workspace:"
- **Solution**: Update npm to version 7+ or use pnpm/yarn

### Build fails with "turbo not found"
- **Solution**: Make sure `npm install` runs from root directory first

