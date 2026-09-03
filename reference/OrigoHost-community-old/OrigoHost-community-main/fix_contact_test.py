import re
with open("src/routes/contact.test.tsx", "r") as f:
    code = f.read()

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
            return { success: true };
          };
        }
      };
      return fnObj;
    }
  };
});
"""

code = code.replace("describe(\"ContactPage\", () => {", mock_start + "\ndescribe(\"ContactPage\", () => {")

with open("src/routes/contact.test.tsx", "w") as f:
    f.write(code)
