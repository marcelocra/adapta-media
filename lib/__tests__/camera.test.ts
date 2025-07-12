import { describe, it, expect, vi } from "vitest";
import { initializeCamera, stopCamera } from "../camera";

// Mock navigator.mediaDevices
const mockGetUserMedia = vi.fn();
Object.defineProperty(navigator, "mediaDevices", {
  value: {
    getUserMedia: mockGetUserMedia,
  },
  writable: true,
});

describe("camera", () => {
  describe("initializeCamera", () => {
    it("should return stream when successful", async () => {
      const mockStream = {
        getTracks: vi.fn().mockReturnValue([]),
      } as unknown as MediaStream;

      mockGetUserMedia.mockResolvedValue(mockStream);

      const result = await initializeCamera();
      expect(result.stream).toBe(mockStream);
      expect(result.error).toBeNull();
    });

    it("should return error when camera access fails", async () => {
      const mockError = new Error("Camera not accessible");
      mockGetUserMedia.mockRejectedValue(mockError);

      const result = await initializeCamera();
      expect(result.stream).toBeNull();
      expect(result.error).toBe("Camera not accessible");
    });
  });

  describe("stopCamera", () => {
    it("should stop all tracks", () => {
      const mockTrack = { stop: vi.fn() };
      const mockStream = {
        getTracks: vi.fn().mockReturnValue([mockTrack]),
      } as unknown as MediaStream;

      stopCamera(mockStream);
      expect(mockTrack.stop).toHaveBeenCalled();
    });

    it("should handle null stream", () => {
      expect(() => stopCamera(null)).not.toThrow();
    });
  });
});
