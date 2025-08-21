# Firebase Setup Guide for Jm Novelties Gift Store

This guide will help you set up Firebase for your gift store application to replace hardcoded data with a real database.

## Prerequisites

- A Google account
- Node.js and npm installed
- Your Next.js project ready

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "jm-novelties-gift-store")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location closest to your users
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "jm-novelties-web")
6. Copy the Firebase configuration object

## Step 4: Set Environment Variables

1. Create a `.env.local` file in your project root (copy from `env.example`)
2. Fill in your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 5: Set Up Firestore Security Rules

1. In Firestore Database, go to "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to products for everyone
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // Only allow admin access via your app
    }
    
    // Allow read/write access to inquiries for everyone
    match /inquiries/{inquiryId} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

## Step 6: Seed Your Database

1. Start your development server: `npm run dev`
2. Navigate to `/admin/products`
3. Click the "Seed Database" button to populate with initial products
4. This will add the 6 default products to your database

## Step 7: Test Your Application

1. Visit your main page (`/`) - products should load from Firebase
2. Try adding items to cart and submitting inquiries
3. Check the admin panel (`/admin/products`) to manage products

## API Endpoints

Your application now has the following API endpoints:

- `GET /api/products` - Fetch all products
- `POST /api/products` - Add new product
- `GET /api/products/[id]` - Fetch single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `POST /api/inquiries` - Submit customer inquiry

## Database Collections

### Products Collection
```javascript
{
  name: "Product Name",
  category: "Category",
  price: 2999,
  image: "/image-url",
  description: "Product description",
  inStock: true,
  featured: false,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### Inquiries Collection
```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  company: "Company Name",
  address: "Full address",
  additionalNotes: "Special requirements",
  cartItems: [...],
  totalAmount: 9999,
  status: "pending",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Firestore Rules**: Implement proper security rules for production
3. **API Rate Limiting**: Consider implementing rate limiting for production
4. **Authentication**: Add user authentication for admin access in production

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/network-request-failed)"**
   - Check your internet connection
   - Verify Firebase project is active

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Verify your API key in `.env.local`
   - Check if the API key is correct in Firebase console

3. **"Firebase: Error (firestore/permission-denied)"**
   - Check your Firestore security rules
   - Ensure rules allow read/write operations

4. **Products not loading**
   - Check browser console for errors
   - Verify Firestore database has data
   - Check if collections exist

### Debug Mode

To enable debug mode, add this to your Firebase config:

```javascript
// In src/lib/firebase.js
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase config:', firebaseConfig);
}
```

## Next Steps

1. **Add Authentication**: Implement user login for admin access
2. **Image Upload**: Use Firebase Storage for product images
3. **Real-time Updates**: Implement real-time listeners for live data
4. **Analytics**: Add Firebase Analytics for user behavior tracking
5. **Performance**: Implement pagination and lazy loading for large datasets

## Support

If you encounter issues:
1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the [Next.js API Routes documentation](https://nextjs.org/docs/api-routes/introduction)
3. Check browser console for error messages
4. Verify all environment variables are set correctly
