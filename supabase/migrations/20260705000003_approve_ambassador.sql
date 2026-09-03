-- Migration to create secure approval function

CREATE OR REPLACE FUNCTION public.approve_ambassador_application(application_id uuid)
RETURNS jsonb AS $$
DECLARE
  v_app public.ambassador_applications_v2%ROWTYPE;
  v_admin_id uuid;
  v_role user_role;
BEGIN
  -- Get current user (must be admin or super_admin)
  v_admin_id := auth.uid();
  IF NOT public.has_role(v_admin_id, 'admin') AND NOT public.has_role(v_admin_id, 'super_admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Get application
  SELECT * INTO v_app FROM public.ambassador_applications_v2 WHERE id = application_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found';
  END IF;

  IF v_app.status = 'approved' THEN
    RAISE EXCEPTION 'Application is already approved';
  END IF;

  -- 1. Update Application Status
  UPDATE public.ambassador_applications_v2
  SET status = 'approved',
      approved_by = v_admin_id,
      approved_at = now()
  WHERE id = application_id;

  -- 2. Update Role to ambassador
  UPDATE public.user_roles
  SET role = 'ambassador'::user_role
  WHERE user_id = v_app.user_id;

  -- 3. Create Ambassador Profile
  INSERT INTO public.ambassador_profiles_v2 (user_id, college)
  VALUES (v_app.user_id, v_app.college)
  ON CONFLICT (user_id) DO NOTHING;

  -- 4. Audit Log
  INSERT INTO public.system_audit_logs (actor_id, action, details)
  VALUES (v_admin_id, 'Approved Ambassador Application', jsonb_build_object('application_id', application_id, 'applicant_id', v_app.user_id));

  RETURN jsonb_build_object('success', true, 'message', 'Application approved successfully');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
