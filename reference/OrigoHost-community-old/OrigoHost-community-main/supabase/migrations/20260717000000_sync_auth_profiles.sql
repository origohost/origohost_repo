-- Create a function to handle new user signups and sync to profiles
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, updated_at)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = EXCLUDED.updated_at;

  -- Also ensure they get a default user_role if they don't have one
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'student')
  ON CONFLICT (user_id) DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger for updates to sync metadata changes from auth to profiles
CREATE OR REPLACE FUNCTION public.handle_user_update() 
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles
  SET 
    full_name = COALESCE(new.raw_user_meta_data->>'full_name', full_name),
    avatar_url = COALESCE(new.raw_user_meta_data->>'avatar_url', avatar_url),
    updated_at = now()
  WHERE id = new.id;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF raw_user_meta_data ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();

-- Sync existing users safely
DO $$
DECLARE
  u record;
BEGIN
  FOR u IN SELECT * FROM auth.users LOOP
    INSERT INTO public.profiles (id, full_name, avatar_url, updated_at)
    VALUES (
      u.id, 
      u.raw_user_meta_data->>'full_name', 
      u.raw_user_meta_data->>'avatar_url',
      now()
    )
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (u.id, 'student')
    ON CONFLICT (user_id) DO NOTHING;
  END LOOP;
END;
$$;
