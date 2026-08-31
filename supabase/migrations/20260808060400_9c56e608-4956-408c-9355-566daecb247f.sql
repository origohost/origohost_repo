-- Internal RLS/audit helpers must not be directly callable by signed-out visitors.
-- Verified: no anon-applicable policy references these functions.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[]) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_platform_admin(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_permission(uuid, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_audit(text, text, text, jsonb) FROM anon;

-- Trigger-only function: never called directly by any client role.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;