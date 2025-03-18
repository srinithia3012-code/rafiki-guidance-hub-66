
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from URL hash fragment
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error during auth callback:', error);
          setError('Authentication failed. Please try again.');
          toast.error('Authentication failed. Please try again.');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        if (data.session) {
          console.log('Authentication successful:', data.session);
          toast.success('Successfully signed in!');
          navigate('/dashboard'); // Redirect to Dashboard instead of home
        } else {
          // No session found
          console.error('No session found during callback');
          setError('No session found. Please try signing in again.');
          toast.error('No session found. Please try signing in again.');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (catchError) {
        console.error('Exception during auth callback:', catchError);
        setError('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.');
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-6 rounded-lg glass-card">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium">Authenticating...</p>
            <p className="text-sm text-gray-500 mt-2">You'll be redirected shortly</p>
          </>
        ) : error ? (
          <>
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-lg font-medium text-red-600">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting you to the home page...</p>
          </>
        ) : (
          <>
            <div className="text-green-500 text-xl mb-4">✓</div>
            <p className="text-lg font-medium text-green-600">Successfully authenticated!</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting you to your dashboard...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
