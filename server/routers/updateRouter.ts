import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createFileUpload, createUpdate, getUserUpdates, getUpdateMappings, updateUpdateStatus } from "../db";
import { storagePut } from "../storage";
import { analyzeExcelFile } from "../processors/excelProcessor";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const updateRouter = router({
  uploadExcel: protectedProcedure
    .input(z.object({
      fileName: z.string(),
      fileBuffer: z.instanceof(Buffer),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.fileBuffer.length > MAX_FILE_SIZE) {
          throw new Error("File size exceeds 50MB limit");
        }

        const fileKey = `uploads/${ctx.user.id}/excel/${Date.now()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, input.fileBuffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        await createFileUpload({
          userId: ctx.user.id,
          fileName: input.fileName,
          fileType: "excel",
          fileUrl: url,
          fileSize: input.fileBuffer.length,
        });

        const analysis = await analyzeExcelFile(input.fileBuffer);

        return {
          success: true,
          fileName: input.fileName,
          analysis,
        };
      } catch (error) {
        console.error("Error uploading Excel:", error);
        throw new Error(`Failed to upload Excel file: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  uploadPPTX: protectedProcedure
    .input(z.object({
      fileName: z.string(),
      fileBuffer: z.instanceof(Buffer),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.fileBuffer.length > MAX_FILE_SIZE) {
          throw new Error("File size exceeds 50MB limit");
        }

        const fileKey = `uploads/${ctx.user.id}/pptx/${Date.now()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, input.fileBuffer, "application/vnd.openxmlformats-officedocument.presentationml.presentation");

        await createFileUpload({
          userId: ctx.user.id,
          fileName: input.fileName,
          fileType: "pptx",
          fileUrl: url,
          fileSize: input.fileBuffer.length,
        });

        return {
          success: true,
          fileName: input.fileName,
        };
      } catch (error) {
        console.error("Error uploading PPTX:", error);
        throw new Error(`Failed to upload PPTX file: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  getHistory: protectedProcedure.query(async ({ ctx }) => {
    try {
      const updates = await getUserUpdates(ctx.user.id);
      return {
        success: true,
        updates,
      };
    } catch (error) {
      console.error("Error fetching update history:", error);
      throw new Error("Failed to fetch update history");
    }
  }),

  getMappings: protectedProcedure
    .input(z.object({
      updateId: z.number(),
    }))
    .query(async ({ input }) => {
      try {
        const mappings = await getUpdateMappings(input.updateId);
        return {
          success: true,
          mappings,
        };
      } catch (error) {
        console.error("Error fetching mappings:", error);
        throw new Error("Failed to fetch mappings");
      }
    }),
});
