import { describe, it, expect } from "vitest";
import {
  getAllAds,
  getAdById,
  searchAds,
  filterAds,
  calculateAdMetrics,
} from "../ads";
import type { FilterOptions } from "@/types";

describe("ads", () => {
  describe("getAllAds", () => {
    it("should return all ads", () => {
      const ads = getAllAds();
      expect(ads).toHaveLength(3);
      expect(ads[0]).toHaveProperty("id");
      expect(ads[0]).toHaveProperty("title");
    });
  });

  describe("getAdById", () => {
    it("should return the correct ad when found", () => {
      const ad = getAdById("1");
      expect(ad).toBeTruthy();
      expect(ad?.id).toBe("1");
    });

    it("should return null when ad not found", () => {
      const ad = getAdById("nonexistent");
      expect(ad).toBeNull();
    });
  });

  describe("searchAds", () => {
    it("should return all ads when query is empty", () => {
      const ads = searchAds("");
      expect(ads).toHaveLength(3);
    });

    it("should filter ads by title", () => {
      const ads = searchAds("Black Friday");
      expect(ads).toHaveLength(1);
      expect(ads[0].title).toContain("Black Friday");
    });

    it("should filter ads by campaign", () => {
      const ads = searchAds("Fashion");
      expect(ads).toHaveLength(1);
      expect(ads[0].campaign).toContain("Fashion");
    });

    it("should be case insensitive", () => {
      const ads = searchAds("black friday");
      expect(ads).toHaveLength(1);
    });
  });

  describe("filterAds", () => {
    it("should filter by status", () => {
      const filters: FilterOptions = { status: ["active"] };
      const ads = filterAds(filters);
      expect(ads.every((ad) => ad.status === "active")).toBe(true);
    });

    it("should filter by campaign", () => {
      const filters: FilterOptions = { campaign: "Fashion" };
      const ads = filterAds(filters);
      expect(ads).toHaveLength(1);
      expect(ads[0].campaign).toContain("Fashion");
    });
  });

  describe("calculateAdMetrics", () => {
    it("should calculate metrics correctly", () => {
      const ad = getAllAds()[0];
      const metrics = calculateAdMetrics(ad);

      expect(metrics).toHaveProperty("roi");
      expect(metrics).toHaveProperty("cpc");
      expect(metrics).toHaveProperty("costPerConversion");
      expect(metrics).toHaveProperty("conversionRate");

      expect(metrics.cpc).toBeGreaterThan(0);
      expect(metrics.conversionRate).toBeGreaterThan(0);
    });
  });
});
