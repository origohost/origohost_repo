import re

# Fix idempotency.test.ts
with open("src/tests/idempotency.test.ts", "r") as f:
    idem = f.read()

idem = idem.replace("beforeEach(() => {", "beforeEach(() => {\n  process.env.SUPABASE_URL = 'http://localhost';\n  process.env.SUPABASE_SECRET_KEY = 'mock';")
with open("src/tests/idempotency.test.ts", "w") as f:
    f.write(idem)

# Fix email-security.test.ts
# Testing createServerFn directly without Start context fails. We need to mock createServerFn globally or extract the handler.
# Actually, since it's just testing validation, maybe we can mock @tanstack/start-client-core ?
with open("src/tests/email-security.test.ts", "r") as f:
    email = f.read()

mock_start = """
vi.mock('@tanstack/start-client-core', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    createServerFn: () => {
      let handlerFunc: any;
      let validatorFunc: any;
      const fnObj = {
        validator: (v: any) => {
          validatorFunc = v;
          return fnObj;
        },
        handler: (h: any) => {
          handlerFunc = h;
          return async (payload: any) => {
            if (validatorFunc) {
               try { validatorFunc(payload.data); } catch(e) { return Promise.reject(e); }
            }
            return handlerFunc(payload);
          };
        }
      };
      return fnObj;
    }
  };
});
"""

email = email.replace("describe('Email Security & Validation Tests', () => {", mock_start + "\ndescribe('Email Security & Validation Tests', () => {")

with open("src/tests/email-security.test.ts", "w") as f:
    f.write(email)

