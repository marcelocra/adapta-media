"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Users, Clock, X } from "lucide-react";
import { IApiDisplayRecord } from "@/interfaces/display";
import { ApiPaginationDefault, IApiPagination } from "@/interfaces/pagination";
import JsonViewComponent from "../json-view/JsonViewComponent";
import { API_URL, cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Spinner } from "../ui/spinner";
import { useInsightsWebSocket } from "@/hooks/useInsightsWebSocket";
import { useTypewriterEffect } from "@/hooks/useTypewriterEffect";

export function AdsList() {
  const [records, setRecords] = useState<IApiDisplayRecord[]>([]);
  const [selectedRecord, setSelectedRecord] =
    useState<IApiDisplayRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] =
    useState<IApiPagination>(ApiPaginationDefault);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${API_URL}/display`);

      if (!response.ok) {
        throw new Error("Failed to fetch records");
      }

      const data = await response.json();
      setRecords(data.records);
      setSelectedRecord(data.records?.[0] || null);
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        pages: data.pages,
        has_next: data.has_next,
        has_prev: data.has_prev,
      });
    } catch (err) {
      console.log({ DisplaysTableFetchRecords: err });
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ADVERTISEMENT":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [generateInsightsLoading, setGenerateInsightsLoading] =
    useState<boolean>(false);
  const [insightsJobStarted, setInsightsJobStarted] = useState<boolean>(false);

  const insightsWebSocket = useInsightsWebSocket({
    recordId: selectedRecord?._id || "",
    enabled: insightsJobStarted && !!selectedRecord?._id,
  });

  // Use streaming content from WebSocket instead of static record insights
  const insightsContent =
    insightsWebSocket.streamingContent || selectedRecord?.insights || "";

  const showInsightsContent = () => {
    const result =
      selectedRecord?.insights &&
      selectedRecord?.status?.toLowerCase() === "insights_completed";
    return result;
  };
  const { displayedText: displayedInsights, isTyping: isTypingInsights } =
    useTypewriterEffect({
      text: insightsContent,
      speed: 20,
      enabled: !!insightsContent && insightsWebSocket.isComplete,
    });

  useEffect(() => {
    if (insightsWebSocket.isComplete) {
      // Update the selected record with the final content
      setSelectedRecord((prev) =>
        prev
          ? {
              ...prev,
              insights: insightsWebSocket.fullContent,
              status: "insights_completed",
            }
          : null,
      );
      setInsightsJobStarted(false);
    }
  }, [insightsWebSocket.isComplete, insightsWebSocket.fullContent]);

  const generateInsights = async () => {
    try {
      setGenerateInsightsLoading(true);
      const response = await fetch(`http://${API_URL}/jobs/insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedRecord?._id }),
      });
      const data = await response.json();
      setInsightsJobStarted(true);
    } catch (error) {
      console.error("Erro ao gerar insights:", error);
    } finally {
      setGenerateInsightsLoading(false);
    }
  };

  const [generateCopywriterLoading, setGenerateCopywriterLoading] =
    useState<boolean>(false);
  const generateCopywriter = async () => {
    try {
      setGenerateCopywriterLoading(true);
      const response = await fetch(`http://${API_URL}/jobs/copywriter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedRecord?._id }),
      });
      const data = await response.json();
      // Atualize o estado do selectedRecord com o novo copywriter
    } catch (error) {
      console.error("Erro ao gerar copywriter:", error);
    } finally {
      setGenerateCopywriterLoading(false);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll quando o conteúdo for atualizado
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [insightsContent, displayedInsights]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando registros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Displays Table</h1>
        <p className="text-gray-600 mt-2">
          Total de {pagination.total} registros | Página {pagination.page} de{" "}
          {pagination.pages}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800">
            ⚠️ Erro ao conectar com a API: {error}. Usando dados de exemplo.
          </p>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableCaption>
            {pagination.total > 0
              ? `${pagination.total} registros encontrados`
              : "Nenhum registro encontrado"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Pessoas</TableHead>
              <TableHead className="text-center">Duração</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record._id}>
                <TableCell className="font-mono text-sm">
                  {record._id.slice(-8)}
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="font-medium truncate">{record.title}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {record.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getTypeColor(record.type)}
                  >
                    {record.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(record.status)}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{record.webcam.deepface.total}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{record.duration}s</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {formatTimestamp(record.timestamp)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedRecord && (
        <Dialog
          open={true}
          onOpenChange={(open) => {
            if (!open) setSelectedRecord(null);
          }}
        >
          <DialogContent className="min-w-[100vw] min-h-[100vh] overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between gap-4">
              <div className="flex items-center justify-between gap-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-sm font-medium px-3 py-1 rounded-full border-2",
                    getStatusColor(selectedRecord.status),
                  )}
                >
                  {selectedRecord.status.toUpperCase()}
                </Badge>
                {selectedRecord.title}
              </div>
            </DialogHeader>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                  <div className="max-h-[500px] overflow-y-auto border rounded">
                    <JsonViewComponent
                      record={selectedRecord}
                      classname="text-gray-800 prose prose-sm border rounded"
                    />
                  </div>
                </div>

                <div className="rounded-lg">
                  {/* <h2 className="text-xl font-bold mb-4">
                    LLM (NVIDIA llama-3.3-nemotron-super-49b-v1 NIM)
                  </h2> */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div
                        ref={containerRef}
                        className="max-h-[500px] overflow-y-auto"
                        style={{ scrollBehavior: "smooth" }}
                      >
                        <MarkdownPreview
                          source={
                            insightsWebSocket.isStreaming ||
                            showInsightsContent()
                              ? insightsContent
                              : displayedInsights
                          }
                          className="text-gray-800 prose prose-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 sticky top-4 justify-end">
                {/* {!selectedRecord.insights && ( */}
                <button
                  onClick={() => generateInsights()}
                  className="px-4 py-2 rounded text-white whitespace-nowrap flex items-center gap-2 transition-colors
               bg-green-500 hover:bg-green-600 
               disabled:bg-green-900 disabled:cursor-not-allowed"
                  disabled={
                    generateInsightsLoading || insightsWebSocket.isStreaming
                  }
                >
                  {(generateInsightsLoading ||
                    insightsWebSocket.isStreaming) && <Spinner size={15} />}
                  <span>
                    {insightsWebSocket.isStreaming
                      ? "Streaming Insights..."
                      : generateInsightsLoading
                        ? "Gerando Insights..."
                        : "Gerar Insights"}
                  </span>
                </button>
                {/* )} */}

                {!selectedRecord.copywriter && (
                  <button
                    onClick={() => generateCopywriter()}
                    className="px-4 py-2 rounded text-white whitespace-nowrap flex items-center gap-2 transition-colors
               bg-green-500 hover:bg-green-600 
               disabled:bg-green-900 disabled:cursor-not-allowed"
                    disabled={generateCopywriterLoading}
                  >
                    {generateCopywriterLoading && <Spinner size={15} />}
                    <span>
                      {generateCopywriterLoading
                        ? "Gerando Copywriter..."
                        : "Gerar Copywriter"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {pagination.total > pagination.limit && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando {(pagination.page - 1) * pagination.limit + 1} até{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} de{" "}
            {pagination.total} registros
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={!pagination.has_prev}>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled={!pagination.has_next}>
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
