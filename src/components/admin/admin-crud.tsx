import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2, X, Search, Download, Trash, UploadCloud } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogTitle } from "@radix-ui/react-dialog";
import { queryKeys } from "@/lib/query-keys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { secureUploadFn } from "@/actions/upload";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "tags"
  | "datetime"
  | "date"
  | "time"
  | "image";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  defaultValue?: unknown;
  bucket?: string;
}

export interface CrudConfig {
  table: string;
  singular: string;
  fields: FieldDef[];
  listColumns: { key: string; label: string; format?: (v: unknown) => string }[];
  orderBy?: { column: string; ascending?: boolean };
  select?: string;
  readonly?: boolean;
}

type Row = Record<string, unknown> & { id: string };

const emptyFor = (fields: FieldDef[]): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.defaultValue !== undefined) out[f.key] = f.defaultValue;
    else if (f.type === "boolean") out[f.key] = false;
    else if (f.type === "number") out[f.key] = 0;
    else if (f.type === "tags") out[f.key] = [];
    else out[f.key] = "";
  }
  return out;
};

const toInputDatetime = (v: unknown) => {
  if (!v) return "";
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return "";
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
};

async function fetchRows(cfg: CrudConfig): Promise<Row[]> {
  let q = supabase.from(cfg.table).select(cfg.select ?? "*");
  if (cfg.orderBy) {
    q = q.order(cfg.orderBy.column, { ascending: cfg.orderBy.ascending ?? true });
  }
  const { data, error } = await q.limit(500);
  if (error) throw error;
  return (data ?? []) as unknown as Row[];
}

export function AdminCrud({ config }: { config: CrudConfig }) {
  const queryClient = useQueryClient();
  const key = queryKeys.admin.table(config.table);
  const q = useQuery({ queryKey: key, queryFn: () => fetchRows(config) });

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>(() => emptyFor(config.fields));
  const [saving, setSaving] = useState(false);

  // Enterprise Features State
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isOpen = creating || !!editing;

  useEffect(() => {
    if (creating) setForm(emptyFor(config.fields));
    else if (editing) {
      const next: Record<string, unknown> = {};
      for (const f of config.fields) next[f.key] = editing[f.key] ?? emptyFor([f])[f.key];
      setForm(next);
    }
  }, [creating, editing, config.fields]);

  function setField(k: string, v: unknown) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function submit() {
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {};
      for (const f of config.fields) {
        let v = form[f.key];
        if (f.type === "datetime" && typeof v === "string" && v) {
          v = new Date(v).toISOString();
        }
        if (f.type === "number" && typeof v === "string") v = Number(v || 0);
        if (f.type === "tags" && typeof v === "string") {
          v = (v as string)
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean);
        }
        if (f.required && (v === "" || v === null || v === undefined)) {
          throw new Error(`${f.label} is required`);
        }
        payload[f.key] = v === "" ? null : v;
      }
      if (editing) {
        const { error } = await supabase.from(config.table).update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Updated successfully");
      } else {
        const { error } = await supabase.from(config.table).insert(payload);
        if (error) throw error;
        toast.success("Created successfully");
      }
      setEditing(null);
      setCreating(false);
      queryClient.invalidateQueries({ queryKey: key });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm(`Delete this ${config.singular}?`)) return;
    const { error } = await supabase.from(config.table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted successfully");
    queryClient.invalidateQueries({ queryKey: key });
  }

  async function bulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected items? This cannot be undone.`)) return;

    const ids = Array.from(selectedIds);
    const { error } = await supabase.from(config.table).delete().in("id", ids);
    if (error) return toast.error(error.message);

    toast.success(`Deleted ${ids.length} items`);
    setSelectedIds(new Set());
    queryClient.invalidateQueries({ queryKey: key });
  }

  function exportCSV() {
    if (!q.data || q.data.length === 0) return;

    // Use currently visible rows (filtered) for export
    const rowsToExport = filteredRows;

    const headers = config.listColumns.map((c) => c.label).join(",");
    const csvContent = rowsToExport
      .map((row) => {
        return config.listColumns
          .map((c) => {
            let val = row[c.key];
            if (val === null || val === undefined) val = "";
            // Escape quotes and wrap in quotes if there's a comma
            const strVal = String(val).replace(/"/g, '""');
            return `"${strVal}"`;
          })
          .join(",");
      })
      .join("\n");

    const fullCsv = headers + "\n" + csvContent;
    const blob = new Blob([fullCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${config.table}_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const cols = useMemo(() => config.listColumns, [config.listColumns]);

  // Enterprise Filter
  const filteredRows = useMemo(() => {
    if (!q.data) return [];
    if (!search.trim()) return q.data;
    const lowerSearch = search.toLowerCase();
    return q.data.filter((row) => {
      return cols.some((c) => {
        const val = row[c.key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(lowerSearch);
      });
    });
  }, [q.data, search, cols]);

  const allSelected = filteredRows.length > 0 && selectedIds.size === filteredRows.length;

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRows.map((r) => r.id)));
    }
  }

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-4 shadow-sm">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-ink)]/40" />
          <Input
            placeholder={`Search ${q.data?.length ?? 0} records...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-zinc-50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-[var(--brand-ink)]/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.size > 0 ? (
            <div className="flex items-center gap-2 animate-in fade-in mr-2">
              <span className="text-sm font-semibold text-[var(--brand-ink)]/60">
                {selectedIds.size} selected
              </span>
              <Button size="sm" variant="destructive" onClick={bulkDelete} className="gap-2">
                <Trash className="h-4 w-4" /> Bulk Delete
              </Button>
            </div>
          ) : null}

          <Button
            size="sm"
            variant="outline"
            onClick={exportCSV}
            disabled={!q.data?.length}
            className="gap-2"
          >
            <Download className="h-4 w-4" /> Export
          </Button>
          {!config.readonly && (
            <Button
              size="sm"
              onClick={() => setCreating(true)}
              className="gap-2 bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white"
            >
              <Plus className="h-4 w-4" /> New {config.singular}
            </Button>
          )}
        </div>
      </div>

      {q.isLoading && (
        <div className="flex items-center justify-center p-12 text-sm text-[var(--brand-ink)]/60">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--brand-orange)]" />
        </div>
      )}

      {q.isError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {(q.error as Error).message}
        </p>
      )}

      {filteredRows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-[var(--brand-ink)]/10 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50/80 text-left text-xs uppercase tracking-wider text-[var(--brand-ink)]/50">
              <tr>
                <th className="px-4 py-3 w-[40px]">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="rounded border-[var(--brand-ink)]/20 text-[var(--brand-ink)] focus:ring-[var(--brand-ink)]"
                  />
                </th>
                {cols.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-bold">
                    {c.label}
                  </th>
                ))}
                {!config.readonly && <th className="px-4 py-3 text-right font-bold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--brand-ink)]/5">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className={`group transition-colors hover:bg-zinc-50/50 ${selectedIds.has(row.id) ? "bg-blue-50/30" : ""}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="rounded border-[var(--brand-ink)]/20 text-[var(--brand-ink)] focus:ring-[var(--brand-ink)]"
                    />
                  </td>
                  {cols.map((c) => {
                    const raw = row[c.key];
                    const text = c.format
                      ? c.format(raw)
                      : Array.isArray(raw)
                        ? raw.join(", ")
                        : raw === null || raw === undefined
                          ? "—"
                          : typeof raw === "boolean"
                            ? raw
                              ? "✓"
                              : "—"
                            : String(raw);
                    return (
                      <td
                        key={c.key}
                        className="max-w-[280px] truncate px-4 py-3 text-[var(--brand-ink)]/80 font-medium"
                      >
                        {text}
                      </td>
                    );
                  })}
                  {!config.readonly && (
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditing(row)}
                          aria-label="Edit"
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4 text-[var(--brand-ink)]/60" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => remove(row.id)}
                          aria-label="Delete"
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {q.data && q.data.length === 0 && !q.isLoading && (
        <div className="rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-zinc-100">
            <Plus className="h-6 w-6 text-[var(--brand-ink)]/40" />
          </div>
          <h3 className="text-lg font-bold text-[var(--brand-ink)]">No {config.singular}s</h3>
          <p className="mt-1 mb-4 text-sm text-[var(--brand-ink)]/60">
            Get started by creating a new record.
          </p>
          {!config.readonly && (
            <Button onClick={() => setCreating(true)} className="gap-2">
              <Plus className="h-4 w-4" /> New {config.singular}
            </Button>
          )}
        </div>
      )}

      {q.data && q.data.length > 0 && filteredRows.length === 0 && (
        <div className="rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-[var(--brand-ink)]/60">No results found for "{search}".</p>
          <Button variant="link" onClick={() => setSearch("")}>
            Clear search
          </Button>
        </div>
      )}

      {/* Slide-over / Modal for Create/Edit */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-ink)]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditing(null);
              setCreating(false);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--brand-ink)]/5 p-6 bg-zinc-50/50">
              <h3 className="text-xl font-black text-[var(--brand-ink)]">
                {editing ? `Edit ${config.singular}` : `Create ${config.singular}`}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-[var(--brand-ink)]/10"
                aria-label="Close"
                onClick={() => {
                  setEditing(null);
                  setCreating(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form
                id="crud-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit();
                }}
                className="space-y-5"
              >
                {config.fields.map((f) => {
                  const id = `f-${f.key}`;
                  const val = form[f.key];
                  return (
                    <div key={f.key}>
                      <Label
                        htmlFor={id}
                        className="mb-2 block font-semibold text-[var(--brand-ink)]/80"
                      >
                        {f.label}
                        {f.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {f.type === "textarea" ? (
                        <Textarea
                          id={id}
                          value={String(val ?? "")}
                          onChange={(e) => setField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          rows={4}
                          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
                        />
                      ) : f.type === "boolean" ? (
                        <label className="inline-flex items-center gap-3 rounded-lg border border-[var(--brand-ink)]/10 bg-zinc-50 px-4 py-3 cursor-pointer hover:bg-zinc-100/50 transition-colors">
                          <input
                            id={id}
                            type="checkbox"
                            checked={Boolean(val)}
                            onChange={(e) => setField(f.key, e.target.checked)}
                            className="h-5 w-5 rounded border-zinc-300 text-[var(--brand-ink)] focus:ring-[var(--brand-ink)]"
                          />
                          <span className="text-sm font-medium">{f.placeholder ?? "Enabled"}</span>
                        </label>
                      ) : f.type === "select" ? (
                        <select
                          id={id}
                          value={String(val ?? "")}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="flex h-10 w-full rounded-md border border-[var(--brand-ink)]/10 bg-zinc-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-ink)]/20"
                        >
                          <option value="">— Select —</option>
                          {(f.options ?? []).map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : f.type === "tags" ? (
                        <Input
                          id={id}
                          value={
                            Array.isArray(val) ? (val as string[]).join(", ") : String(val ?? "")
                          }
                          onChange={(e) => setField(f.key, e.target.value)}
                          placeholder={f.placeholder ?? "Enter comma separated values..."}
                          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
                        />
                      ) : f.type === "datetime" ? (
                        <Input
                          id={id}
                          type="datetime-local"
                          value={toInputDatetime(val)}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
                        />
                      ) : f.type === "number" ? (
                        <Input
                          id={id}
                          type="number"
                          value={String(val ?? 0)}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
                        />
                      ) : f.type === "date" || f.type === "time" ? (
                        <Input
                          id={id}
                          type={f.type}
                          value={String(val ?? "")}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
                        />
                      ) : f.type === "image" ? (
                        <ImageUploadField
                          id={id}
                          value={String(val ?? "")}
                          onChange={(url) => setField(f.key, url)}
                          bucket={f.bucket}
                        />
                      ) : (
                        <Input
                          id={id}
                          value={String(val ?? "")}
                          onChange={(e) => setField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
                        />
                      )}
                    </div>
                  );
                })}
              </form>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-[var(--brand-ink)]/5 p-6 bg-zinc-50/50">
              <Button
                type="button"
                variant="outline"
                className="font-semibold"
                onClick={() => {
                  setEditing(null);
                  setCreating(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="crud-form"
                disabled={saving}
                className="bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white font-semibold"
              >
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUploadField({ value, onChange, id, bucket = "sponsor_assets" }: { value: string; onChange: (v: string) => void; id: string, bucket?: string }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;
    try {
      setIsUploading(true);
      toast.loading("Uploading image...", { id: "upload" });
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      const res = await secureUploadFn({
        data: {
          fileData: base64Data,
          fileName: file.name,
          mimeType: file.type,
          bucket: bucket,
          allowedType: "image",
        }
      });

      if (!res || !res.success) throw new Error("Upload failed");

      let publicUrl = res.path;
      if (res.provider !== "cloudinary") {
        const { data } = supabase.storage.from(bucket).getPublicUrl(res.path);
        publicUrl = data.publicUrl;
      }
      onChange(publicUrl);
      toast.success("Image uploaded successfully", { id: "upload" });
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to upload image", { id: "upload" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-1">
      {value ? (
        <div className="relative w-full overflow-hidden rounded-xl border border-[var(--brand-ink)]/10 bg-zinc-50/50 group">
          <img src={value} alt="Uploaded preview" className="w-full h-auto object-contain max-h-48 rounded-lg" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm bg-white hover:bg-red-50 text-red-500 hover:text-red-600 border border-red-200"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          className={`relative flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all duration-200 ${
            isDragging 
              ? 'border-[var(--brand-ink)] bg-[var(--brand-ink)]/5 scale-[0.99]' 
              : 'border-[var(--brand-ink)]/20 bg-zinc-50/50 hover:bg-zinc-50 hover:border-[var(--brand-ink)]/40'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith('image/')) handleUpload(file);
          }}
        >
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              e.target.value = '';
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center gap-3 text-center pointer-events-none">
            <div className={`p-3 rounded-full ${isUploading ? 'bg-transparent' : 'bg-[var(--brand-ink)]/5'}`}>
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-[var(--brand-ink)]/60" />
              ) : (
                <UploadCloud className="h-6 w-6 text-[var(--brand-ink)]/60" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--brand-ink)]">
                {isUploading ? "Uploading..." : "Click or drag image to upload"}
              </p>
              {!isUploading && (
                <p className="text-xs text-[var(--brand-ink)]/50 mt-1">
                  SVG, PNG, JPG or GIF (max. 5MB)
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
