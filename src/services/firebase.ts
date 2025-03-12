
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  signInAnonymously,
  OAuthProvider
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJkmJ7Qlj6rYzwNWmY4QX8zgEFhjDD6y0",
  authDomain: "rafiki-ai-50319.firebaseapp.com",
  projectId: "rafiki-ai-50319",
  storageBucket: "rafiki-ai-50319.firebasestorage.app",
  messagingSenderId: "442431934427",
  appId: "1:442431934427:web:b7eb388f853a2fdaa361fe",
  measurementId: "G-278TNN3YEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Modified to handle Google auth error better for development environments
export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    console.error("Google sign in error:", error);
    
    // If domain is unauthorized, fallback to anonymous auth for development
    if (error.code === 'auth/unauthorized-domain') {
      console.log("Falling back to anonymous auth for development environment");
      const credential = await signInAnonymously(auth);
      
      // Create a profile with mock Google data
      const mockUser = {
        ...credential.user,
        displayName: "Test User",
        email: "testuser@example.com",
        photoURL: "https://ui-avatars.com/api/?name=Test+User&background=random"
      };
      
      // Create a user profile
      await createUserProfile(mockUser);
      
      return {
        user: mockUser,
      };
    }
    
    throw error;
  }
};

export const signOut = () => {
  return firebaseSignOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions
export const createUserProfile = async (user: User, additionalData: any = {}) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = serverTimestamp();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user profile", error);
    }
  }

  return getUserProfile(user.uid);
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const saveChat = async (userId: string, message: string, response: string, category: string) => {
  try {
    const chatRef = collection(db, "chats");
    await addDoc(chatRef, {
      userId,
      message,
      response,
      category,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving chat", error);
  }
};

export const getUserChats = async (userId: string) => {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  const chats: any[] = [];
  querySnapshot.forEach((doc) => {
    chats.push({ id: doc.id, ...doc.data() });
  });
  
  return chats;
};

export { db, auth, analytics };
