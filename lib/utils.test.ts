import { describe, it, expect } from "vitest";
import { cn, formatNumber, formatCurrency, getStatusColor } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should combine class names correctly", () => {
      expect(cn("text-red-500", "bg-blue-100")).toBe(
        "text-red-500 bg-blue-100",
      );
    });

    it("should handle conditional classes", () => {
      expect(cn("base-class", true && "conditional-class")).toBe(
        "base-class conditional-class",
      );
      expect(cn("base-class", false && "conditional-class")).toBe("base-class");
    });
  });

  describe("formatNumber", () => {
    it("should format numbers in millions", () => {
      expect(formatNumber(1500000)).toBe("1.5M");
      expect(formatNumber(2000000)).toBe("2.0M");
    });

    it("should format numbers in thousands", () => {
      expect(formatNumber(1500)).toBe("1.5K");
      expect(formatNumber(25000)).toBe("25.0K");
    });

    it("should format small numbers with locale", () => {
      expect(formatNumber(999)).toBe("999");
      expect(formatNumber(123)).toBe("123");
    });
  });

  describe("formatCurrency", () => {
    it("should format currency in BRL", () => {
      const result = formatCurrency(1250.5);
      expect(result).toMatch(/R\$\s*1\.250,50/); // Flexible regex for different locale formats
    });

    it("should format zero currency", () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/R\$\s*0,00/);
    });
  });

  describe("getStatusColor", () => {
    it("should return correct colors for each status", () => {
      expect(getStatusColor("active")).toBe(
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      );
      expect(getStatusColor("paused")).toBe(
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      );
      expect(getStatusColor("completed")).toBe(
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      );
    });
  });
});
