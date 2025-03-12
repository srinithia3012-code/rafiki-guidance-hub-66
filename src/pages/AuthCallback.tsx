
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the session from URL query parameters
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/');
        return;
      }
      
      if (data.session) {
        toast.success('Successfully signed in!');
      }
      
      // Redirect to the home page after authentication
      navigate('/');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600 mx-auto mb-4"></div>
        <p className="text-lg">Authenticating...</p>
        <p className="text-sm text-gray-500 mt-2">You'll be redirected shortly</p>
      </div>
    </div>
  );
};

export default AuthCallback;
