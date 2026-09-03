import { describe, it, expect } from "vitest";
import { getInitials } from "./initials";

describe("getInitials", () => {
  it("returns two-letter initials for a plain first + last name", () => {
    expect(getInitials("Ritik Kumar")).toBe("RK");
    expect(getInitials("Tarun Kumar")).toBe("TK");
  });

  it("strips 'Mr.' / 'Mrs.' / 'Dr.' honorifics with no stray periods", () => {
    expect(getInitials("Mr. Tarun Kumar")).toBe("TK");
    expect(getInitials("Mr Tarun Kumar")).toBe("TK");
    expect(getInitials("Mrs. Priya Sharma")).toBe("PS");
    expect(getInitials("Dr. Kushagra Petwal")).toBe("KP");
    expect(getInitials("Prof. A. P. J. Abdul Kalam")).toBe("AP");
  });

  it("never returns a period character", () => {
    expect(getInitials("Mr. Tarun Kumar")).not.toContain(".");
    expect(getInitials("Mrs. Priya Sharma")).not.toContain(".");
  });

  it("uppercases lowercase input", () => {
    expect(getInitials("ritik kumar")).toBe("RK");
  });

  it("handles single-word names", () => {
    expect(getInitials("Kushagra")).toBe("K");
  });

  it("respects a custom max length", () => {
    expect(getInitials("Ritik Ranjan Kumar", 3)).toBe("RRK");
    expect(getInitials("Mr. Tarun Singh Kumar", 3)).toBe("TSK");
  });

  it("returns an empty string for empty or whitespace-only input", () => {
    expect(getInitials("")).toBe("");
    expect(getInitials("   ")).toBe("");
  });

  it("handles trailing / leading whitespace and tabs around honorifics", () => {
    expect(getInitials("Mr.   Tarun Kumar")).toBe("TK");
    expect(getInitials("  Mr. Tarun Kumar  ")).toBe("TK");
    expect(getInitials("Mr.\tTarun\tKumar")).toBe("TK");
    expect(getInitials("MR. Tarun Kumar")).toBe("TK"); // case-insensitive honorific
  });

  it("handles Indian honorifics (Shri, Sri, Smt.) without stray letters", () => {
    expect(getInitials("Shri Narendra Modi")).toBe("NM");
    expect(getInitials("Sri Rama Krishna")).toBe("RK");
    expect(getInitials("Smt. Sudha Murthy")).toBe("SM");
    expect(getInitials("Shri Narendra Modi")).not.toContain(".");
    expect(getInitials("Smt. Sudha Murthy")).not.toContain(".");
  });

  it("handles honorific WITHOUT a period", () => {
    expect(getInitials("Mr Tarun Kumar")).toBe("TK");
    expect(getInitials("Dr Kushagra Petwal")).toBe("KP");
    expect(getInitials("Prof A P J Abdul Kalam")).toBe("AP");
  });

  it("handles multi-word names with middle initials", () => {
    expect(getInitials("Ritik R. Kumar", 3)).toBe("RRK");
    expect(getInitials("Mr. A. P. J. Abdul Kalam", 4)).toBe("APJA");
    expect(getInitials("Mr. A. P. J. Abdul Kalam", 4)).not.toContain(".");
  });

  it("never returns a period regardless of input punctuation", () => {
    for (const name of [
      "Mr. Tarun Kumar",
      "Mrs. Priya Sharma",
      "Dr. Kushagra Petwal",
      "Prof. A. P. J. Abdul Kalam",
      "Shri Narendra Modi",
      "Smt. Sudha Murthy",
      "Mr Ritik Kumar",
      "Mr.   Tarun Kumar",
    ]) {
      expect(getInitials(name), name).not.toContain(".");
    }
  });
});
