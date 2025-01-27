-- Ensure username is required and unique in profiles
ALTER TABLE public.profiles 
  ALTER COLUMN username SET NOT NULL,
  ADD CONSTRAINT username_length CHECK (char_length(username) >= 3);

-- Create function to check username/password
CREATE OR REPLACE FUNCTION authenticate_user(
  username_input text,
  password_input text
) RETURNS json AS $$
DECLARE
  user_data json;
BEGIN
  SELECT json_build_object(
    'user', auth.users.*,
    'profile', profiles.*
  )
  INTO user_data
  FROM auth.users
  JOIN public.profiles ON auth.users.id = profiles.id
  WHERE profiles.username = username_input;
  
  RETURN user_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
