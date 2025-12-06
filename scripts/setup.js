#!/usr/bin/env node

/**
 * Pipeline AI Setup Script
 * Run this after cloning the repository
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Pipeline AI Setup\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local not found!');
  console.log('📝 Please create .env.local with your API keys');
  console.log('   See .env.example for reference\n');
  process.exit(1);
}

console.log('✅ .env.local found');

// Check Node version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));

if (majorVersion < 18) {
  console.log(`❌ Node.js ${nodeVersion} detected`);
  console.log('   Pipeline AI requires Node.js 18 or higher');
  console.log('   Please upgrade: https://nodejs.org/\n');
  process.exit(1);
}

console.log(`✅ Node.js ${nodeVersion}`);

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.log('❌ Failed to install dependencies');
  process.exit(1);
}

// Check environment variables
console.log('\n🔑 Checking environment variables...');
const envContent = fs.readFileSync(envPath, 'utf8');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'GROQ_API_KEY',
  'DEEPSEEK_API_KEY',
  'KAGGLE_USERNAME',
  'KAGGLE_KEY',
];

let missingVars = [];
requiredVars.forEach(varName => {
  if (!envContent.includes(varName)) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('⚠️  Missing environment variables:');
  missingVars.forEach(v => console.log(`   - ${v}`));
  console.log('\n   Add these to your .env.local file');
} else {
  console.log('✅ All required environment variables present');
}

// Instructions
console.log('\n📋 Next Steps:\n');
console.log('1. Set up Supabase:');
console.log('   - Go to https://supabase.com/dashboard');
console.log('   - Open SQL Editor');
console.log('   - Run the SQL from supabase_schema.sql');
console.log('');
console.log('2. Enable Google OAuth (optional):');
console.log('   - Supabase Dashboard → Authentication → Providers');
console.log('   - Enable Google and add credentials');
console.log('');
console.log('3. Start development server:');
console.log('   npm run dev');
console.log('');
console.log('4. Open browser:');
console.log('   http://localhost:3000');
console.log('');
console.log('📖 For detailed instructions, see SETUP_INSTRUCTIONS.md');
console.log('🚀 For deployment guide, see DEPLOYMENT_CHECKLIST.md');
console.log('');
console.log('✨ Pipeline AI setup complete!\n');
