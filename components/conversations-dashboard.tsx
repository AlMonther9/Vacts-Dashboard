"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ExternalLink, Filter } from "lucide-react";
import Image from "next/image";

interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
}

interface ConversationsResponse {
  items: Conversation[];
  total_items: number;
  start_index: number;
  end_index: number;
  total_pages: number;
  current_page: number;
  current_page_size: number;
}

export function ConversationsDashboard() {
  const [data, setData] = useState<ConversationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startCreatedAt, setStartCreatedAt] = useState<string>("");
  const [endCreatedAt, setEndCreatedAt] = useState<string>("");
  const [startUpdatedAt, setStartUpdatedAt] = useState<string>("");
  const [endUpdatedAt, setEndUpdatedAt] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, [
    page,
    pageSize,
    startCreatedAt,
    endCreatedAt,
    startUpdatedAt,
    endUpdatedAt,
  ]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
      });

      if (startCreatedAt) {
        params.append(
          "start_created_at",
          new Date(startCreatedAt).toISOString()
        );
      }
      if (endCreatedAt) {
        params.append("end_created_at", new Date(endCreatedAt).toISOString());
      }
      if (startUpdatedAt) {
        params.append(
          "start_updated_at",
          new Date(startUpdatedAt).toISOString()
        );
      }
      if (endUpdatedAt) {
        params.append("end_updated_at", new Date(endUpdatedAt).toISOString());
      }

      const response = await fetch(`/api/conversations?${params.toString()}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("[v0] Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setStartCreatedAt("");
    setEndCreatedAt("");
    setStartUpdatedAt("");
    setEndUpdatedAt("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/vacts-logo.svg"
                alt="VACTS"
                width={120}
                height={40}
                className="h-10 w-auto invert"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            Conversation Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and analyze AI chatbot performance across all conversations
          </p>
        </div>

        {/* Filters Bar */}
        <Card className="mb-6 p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              {(startCreatedAt ||
                endCreatedAt ||
                startUpdatedAt ||
                endUpdatedAt) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  Clear filters
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Rows per page:
              </span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-20 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Created From
                </label>
                <input
                  type="date"
                  value={startCreatedAt}
                  onChange={(e) => setStartCreatedAt(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Created To
                </label>
                <input
                  type="date"
                  value={endCreatedAt}
                  onChange={(e) => setEndCreatedAt(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Updated From
                </label>
                <input
                  type="date"
                  value={startUpdatedAt}
                  onChange={(e) => setStartUpdatedAt(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Updated To
                </label>
                <input
                  type="date"
                  value={endUpdatedAt}
                  onChange={(e) => setEndUpdatedAt(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:dark]"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Stats */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-card border-border">
              <div className="text-sm text-muted-foreground mb-1">
                Total Conversations
              </div>
              <div className="text-3xl font-bold text-foreground">
                {data.total_items}
              </div>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="text-sm text-muted-foreground mb-1">
                Current Page
              </div>
              <div className="text-3xl font-bold text-foreground">
                {data.current_page} / {data.total_pages}
              </div>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="text-sm text-muted-foreground mb-1">Showing</div>
              <div className="text-3xl font-bold text-foreground">
                {data.start_index + 1} - {data.end_index}
              </div>
            </Card>
          </div>
        )}

        {/* Table */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-foreground">
                    Conversation ID
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-foreground">
                    Created At
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-foreground">
                    Updated At
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-muted-foreground"
                    >
                      Loading conversations...
                    </td>
                  </tr>
                ) : data?.items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No conversations found
                    </td>
                  </tr>
                ) : (
                  data?.items.map((conversation) => (
                    <tr
                      key={conversation.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                          {conversation.id}
                        </code>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(conversation.created_at).toLocaleString()}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(conversation.updated_at).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <Button variant="brand" size="sm" angle="sharp" asChild>
                          <a
                            href={`https://argaam.vacts.online/?conversation=${conversation.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                          >
                            View
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.total_pages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Page {data.current_page} of {data.total_pages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= data.total_pages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
