#!/usr/bin/env node

/**
 * Firebase Setup Script for Jm Novelties Gift Store
 * 
 * This script helps you set up your Firebase database with initial data.
 * Run this after you've configured your Firebase project and environment variables.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Firebase Setup for Jm Novelties Gift Store\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found!');
    console.log('Please create .env.local file with your Firebase configuration first.');
    console.log('You can copy from env.example and fill in your values.\n');
    process.exit(1);
}

console.log('✅ .env.local file found');
console.log('📋 Next steps to complete your Firebase setup:\n');

console.log('1. 🔥 Create Firebase Project:');
console.log('   - Go to https://console.firebase.google.com/');
console.log('   - Create a new project or select existing one');
console.log('   - Enable Firestore Database (start in test mode)');
console.log('');

console.log('2. 🔑 Get Firebase Config:');
console.log('   - In Project Settings > General > Your Apps');
console.log('   - Click the web icon (</>) to register your app');
console.log('   - Copy the config values to your .env.local file');
console.log('');

console.log('3. 📝 Update .env.local with your values:');
console.log('   - Replace placeholder values with actual Firebase config');
console.log('   - Save the file');
console.log('');

console.log('4. 🚀 Start your development server:');
console.log('   npm run dev');
console.log('');

console.log('5. 🌱 Seed your database:');
console.log('   - Navigate to /admin/products in your browser');
console.log('   - Click "Seed Database" button');
console.log('   - This will populate with initial products');
console.log('');

console.log('6. ✅ Test your application:');
console.log('   - Visit your main page to see products from Firebase');
console.log('   - Try adding items to cart and submitting inquiries');
console.log('');

console.log('📚 For detailed instructions, see FIREBASE_SETUP.md');
console.log('🆘 If you encounter issues, check the troubleshooting section\n');

rl.question('Press Enter when you\'re ready to continue...', () => {
    console.log('\n🎉 Setup instructions completed!');
    console.log('Happy coding with Firebase! 🚀\n');
    rl.close();
});
