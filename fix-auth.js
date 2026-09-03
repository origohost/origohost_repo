const extractErrorMsg = (err) => {
  if (!err) return "Sign-up failed";
  if (typeof err === "string") return err;
  if (err instanceof Error) {
    if (typeof err.message === "string") return err.message;
    try {
      return JSON.stringify(err.message);
    } catch (e) {
      return "Sign-up failed";
    }
  }
  if (err && typeof err === "object") {
    if (typeof err.message === "string") return err.message;
    try {
      return JSON.stringify(err);
    } catch (e) {
      return "Sign-up failed";
    }
  }
  return "Sign-up failed";
};
console.log(extractErrorMsg({}));
console.log(extractErrorMsg(new Error()));
console.log(extractErrorMsg({ message: {} }));
