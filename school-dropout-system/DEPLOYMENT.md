# 🚀 EduGuard Deployment Guide

Complete guide to deploy your School Dropout Detection System to the cloud.

## 🌟 Overview

This system is built with modern, cloud-ready technologies:
- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Firebase (Authentication, Firestore, Storage, Analytics)
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Multiple options (Vercel, Netlify, Firebase Hosting)

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Firebase account
- Git repository
- Domain name (optional)

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: `eduguard-dropout-system`
4. Enable Google Analytics (recommended)
5. Choose your country/region

### 2. Enable Firebase Services

#### Authentication
1. Go to Authentication → Get started
2. Enable Email/Password provider
3. Configure authorized domains if needed

#### Firestore Database
1. Go to Firestore Database → Create database
2. Choose "Start in test mode" initially
3. Select your region (closest to users)

#### Storage
1. Go to Storage → Get started
2. Choose "Start in test mode"
3. Select same region as Firestore

#### Analytics (Optional)
1. Go to Analytics → Get started
2. Configure analytics settings

### 3. Get Firebase Configuration

1. Go to Project Settings → General
2. Scroll to "Your apps" section
3. Click "Web" icon to create web app
4. Register app with name "EduGuard Web"
5. Copy the Firebase configuration object

## 🔐 Environment Variables

Create `.env.local` file in root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id

# Optional: Custom domain
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

#### Automatic Deployment
1. Push code to GitHub/GitLab/Bitbucket
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy!

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Make sure to select all environments (Production, Preview, Development)

### Option 2: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Option 3: Netlify

#### Via Git Integration
1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Add environment variables
5. Deploy

#### Manual Deployment
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod --dir=out
```

## ⚙️ Firebase Security Rules

Deploy Firestore and Storage rules:

```bash
# Deploy security rules
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## 📊 Database Setup

### 1. Create Initial Collections

Use Firebase Console or run this setup script:

```javascript
// In Firebase Console → Firestore → Start collection
// Create these collections with sample documents:

// Collection: users
{
  email: "admin@eduguard.com",
  firstName: "System",
  lastName: "Administrator", 
  role: "admin",
  createdAt: "2024-01-15T00:00:00Z"
}

// Collection: students (sample)
{
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@school.edu",
  grade: "10th",
  riskScore: 25,
  status: "active",
  createdAt: "2024-01-15T00:00:00Z"
}
```

### 2. Import Sample Data (Optional)

Use the built-in import functionality in the dashboard or Firebase Admin SDK.

## 🔧 Configuration

### Update Firebase Config

Update `lib/firebase.ts` with your Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

### Custom Domain (Optional)

#### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

#### For Firebase Hosting:
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the verification steps

## 📈 Performance Optimization

### 1. Enable Compression
Already configured in `next.config.js`

### 2. Image Optimization
Next.js automatically optimizes images

### 3. Code Splitting
Automatic with Next.js App Router

### 4. Caching
Configure in your hosting platform

## 🔒 Security Checklist

- [ ] Firebase security rules deployed
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Authentication configured
- [ ] CORS policies set
- [ ] CSP headers configured
- [ ] Rate limiting enabled (via hosting)

## 🧪 Testing Deployment

### Test Authentication
1. Try registering a new user
2. Test login/logout functionality
3. Verify role-based access

### Test Database Operations
1. Add a new student
2. Create an intervention
3. View analytics
4. Check real-time updates

### Test File Uploads
1. Upload a profile picture
2. Test document uploads
3. Verify file permissions

## 📋 Post-Deployment Steps

### 1. Create Admin User
```bash
# Use Firebase Console or Auth API
# Set custom claims for admin role
```

### 2. Configure Email Templates
Set up Firebase Authentication email templates:
1. Go to Authentication → Templates
2. Customize email verification
3. Set up password reset template

### 3. Set up Analytics
1. Configure Google Analytics 4
2. Set up conversion tracking
3. Create custom events

### 4. Backup Strategy
```bash
# Automated Firestore backups
firebase functions:deploy --only=backupFirestore
```

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm -rf .next
npm install
npm run build
```

#### Firebase Connection Issues
- Check environment variables
- Verify Firebase project settings
- Check security rules

#### Deployment Failures
- Check build logs
- Verify all dependencies
- Check memory limits

### Performance Issues
- Enable caching
- Optimize images
- Review bundle size
- Check database queries

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

## 🎯 Production Checklist

- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Database rules deployed
- [ ] Authentication working
- [ ] File uploads functional
- [ ] Analytics tracking
- [ ] Error monitoring setup
- [ ] Backup strategy implemented
- [ ] Performance optimized
- [ ] Security audit completed

## 🆘 Support

Need help? Contact our support team:
- 📧 Email: support@eduguard.com
- 💬 Discord: [Join our community](https://discord.gg/eduguard)
- 📖 Documentation: [docs.eduguard.com](https://docs.eduguard.com)

---

## 🎉 You're Ready!

Congratulations! Your EduGuard School Dropout Detection System is now live and ready to help educators identify and support at-risk students.

**Live Demo**: `https://your-domain.com`
**Admin Login**: Use the credentials you set up during deployment

Happy deploying! 🚀✨