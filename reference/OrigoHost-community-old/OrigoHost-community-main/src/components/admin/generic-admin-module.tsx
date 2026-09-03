/**
 * GenericAdminModule — Enterprise Edition
 * ──────────────────────────────────────────────────────
 * Replaces the legacy raw-JSON card-grid interface with:
 *   1. Schema-driven dynamic forms (via DynamicForm engine)
 *   2. Professional sortable/searchable data tables
 *   3. Full CRUD with validation
 *   4. Bulk actions, export, and inline search
 *
 * Data lives in the `admin_module_data` JSONB table.
 * The schema registry tells us WHAT fields to render.
 */
import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  getModuleRecords,
  createModuleRecord,
  updateModuleRecord,
  deleteModuleRecord,
  bulkDeleteModuleRecords,
} from "@/actions/admin.module_data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Pencil,
  Loader2,
  X,
  Search,
  Download,
  Trash,
  ChevronUp,
  ChevronDown,
  Eye,
} from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { DynamicForm } from "./dynamic-form";
import { getModuleSchema, type SchemaField, type ModuleSchema } from "@/config/module-schemas";

interface GenericAdminModuleProps {
  workspace: string;
  moduleName: string;
}

type RecordRow = {
  id: string;
  module_name: string;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

function emptyValues(fields: SchemaField[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.defaultValue !== undefined) out[f.key] = f.defaultValue;
    else if (f.type === "boolean") out[f.key] = false;
    else if (f.type === "number") out[f.key] = 0;
    else if (f.type === "tags") out[f.key] = [];
    else out[f.key] = "";
  }
  return out;
}

export function GenericAdminModule({ workspace, moduleName }: GenericAdminModuleProps) {
  const schema = useMemo(() => getModuleSchema(workspace, moduleName), [workspace, moduleName]);
  const moduleKey = `${workspace}/${moduleName}`;

  const [records, setRecords] = useState<RecordRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(() =>
    emptyValues(schema.fields),
  );
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [viewingRecord, setViewingRecord] = useState<RecordRow | null>(null);

  const PAGE_SIZE = 25;

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getModuleRecords({ data: moduleKey });
      setRecords((data || []) as unknown as RecordRow[]);
    } catch (error) {
      toast.error("Failed to load records");
    }
    setLoading(false);
  }, [moduleKey]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // ────── Filtering ──────
  const filteredRecords = useMemo(() => {
    let rows = records;
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        schema.listColumns.some((col) => {
          const val = r.data?.[col];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
        }),
      );
    }
    // Sorting
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = a.data?.[sortKey] ?? "";
        const bv = b.data?.[sortKey] ?? "";
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [records, search, sortKey, sortDir, schema.listColumns]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const pagedRecords = filteredRecords.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // ────── CRUD ──────
  const openCreate = () => {
    setEditingId(null);
    setFormValues(emptyValues(schema.fields));
    setIsModalOpen(true);
  };

  const openEdit = (record: RecordRow) => {
    setEditingId(record.id);
    const vals: Record<string, unknown> = {};
    for (const f of schema.fields) {
      vals[f.key] = record.data?.[f.key] ?? emptyValues([f])[f.key];
    }
    setFormValues(vals);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate required fields
      for (const f of schema.fields) {
        if (f.required) {
          const v = formValues[f.key];
          if (v === "" || v === null || v === undefined) {
            throw new Error(`${f.label} is required`);
          }
        }
      }

      // Clean the data
      const cleanData: Record<string, unknown> = {};
      for (const f of schema.fields) {
        let v = formValues[f.key];
        if (f.type === "number" && typeof v === "string") v = Number(v) || 0;
        if (f.type === "tags" && typeof v === "string") {
          v = v
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean);
        }
        if (f.type === "boolean" && typeof v !== "boolean") v = Boolean(v);
        cleanData[f.key] = v === "" ? null : v;
      }

      if (editingId) {
        await updateModuleRecord({ data: { id: editingId, data: cleanData } });
        toast.success(`${schema.singular} updated`);
      } else {
        await createModuleRecord({ data: { module_name: moduleKey, data: cleanData } });
        toast.success(`${schema.singular} created`);
      }

      closeModal();
      fetchRecords();
    } catch (e: any) {
      toast.error(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete this ${schema.singular}?`)) return;
    try {
      await deleteModuleRecord({ data: id });
      toast.success("Deleted");
      fetchRecords();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete");
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected items?`)) return;
    const ids = Array.from(selectedIds);
    try {
      await bulkDeleteModuleRecords({ data: ids });
      toast.success(`Deleted ${ids.length} items`);
      setSelectedIds(new Set());
      fetchRecords();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  };

  const exportCSV = () => {
    if (filteredRecords.length === 0) return;
    const headers = schema.listColumns.join(",");
    const csvContent = filteredRecords
      .map((r) =>
        schema.listColumns
          .map((col) => {
            const val = r.data?.[col];
            const str = val === null || val === undefined ? "" : String(val).replace(/"/g, '""');
            return `"${str}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob([headers + "\n" + csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${moduleName.toLowerCase().replace(/\s+/g, "_")}_export.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Selection helpers
  const allSelected = pagedRecords.length > 0 && selectedIds.size === pagedRecords.length;
  const toggleAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(pagedRecords.map((r) => r.id)));
  };
  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // Sort helper
  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const getStatusBadge = (val: unknown) => {
    if (!val) return null;
    const str = String(val);
    const colors: Record<string, string> = {
      active: "bg-emerald-100 text-emerald-800",
      confirmed: "bg-emerald-100 text-emerald-800",
      published: "bg-emerald-100 text-emerald-800",
      verified: "bg-emerald-100 text-emerald-800",
      approved: "bg-emerald-100 text-emerald-800",
      completed: "bg-emerald-100 text-emerald-800",
      pass: "bg-emerald-100 text-emerald-800",
      received: "bg-emerald-100 text-emerald-800",
      paid: "bg-emerald-100 text-emerald-800",
      resolved: "bg-emerald-100 text-emerald-800",
      accepted: "bg-emerald-100 text-emerald-800",
      pending: "bg-amber-100 text-amber-800",
      review: "bg-amber-100 text-amber-800",
      in_progress: "bg-blue-100 text-blue-800",
      draft: "bg-slate-100 text-slate-700",
      scheduled: "bg-blue-100 text-blue-800",
      inactive: "bg-slate-100 text-slate-700",
      suspended: "bg-red-100 text-red-800",
      rejected: "bg-red-100 text-red-800",
      cancelled: "bg-red-100 text-red-800",
      blocked: "bg-red-100 text-red-800",
      banned: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
      expired: "bg-slate-100 text-slate-700",
    };
    const cls = colors[str.toLowerCase()] ?? "bg-slate-100 text-slate-700";
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}
      >
        {str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, " ")}
      </span>
    );
  };

  // Get the field type for a column to determine display
  const getFieldType = (colKey: string): string => {
    return schema.fields.find((f) => f.key === colKey)?.type ?? "text";
  };

  return (
    <AdminShell
      title={moduleName}
      description={`Manage ${moduleName} for the ${workspace} workspace.`}
    >
      <div className="space-y-4">
        {/* Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-4 shadow-sm">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-ink)]/40" />
            <Input
              placeholder={`Search ${filteredRecords.length} ${schema.plural.toLowerCase()}...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="pl-9 bg-zinc-50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-[var(--brand-ink)]/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2 animate-in fade-in mr-2">
                <span className="text-sm font-semibold text-[var(--brand-ink)]/60">
                  {selectedIds.size} selected
                </span>
                <Button size="sm" variant="destructive" onClick={bulkDelete} className="gap-2">
                  <Trash className="h-4 w-4" /> Delete
                </Button>
              </div>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={exportCSV}
              disabled={filteredRecords.length === 0}
              className="gap-2"
            >
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button
              size="sm"
              onClick={openCreate}
              className="gap-2 bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white"
            >
              <Plus className="h-4 w-4" /> New {schema.singular}
            </Button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--brand-orange)]" />
          </div>
        )}

        {/* Data Table */}
        {!loading && filteredRecords.length > 0 && (
          <>
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
                    {schema.listColumns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 font-bold cursor-pointer select-none hover:text-[var(--brand-ink)]"
                        onClick={() => toggleSort(col)}
                      >
                        <div className="flex items-center gap-1">
                          {schema.fields.find((f) => f.key === col)?.label ?? col}
                          {sortKey === col &&
                            (sortDir === "asc" ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            ))}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--brand-ink)]/5">
                  {pagedRecords.map((record) => (
                    <tr
                      key={record.id}
                      className={`group transition-colors hover:bg-zinc-50/50 ${
                        selectedIds.has(record.id) ? "bg-blue-50/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(record.id)}
                          onChange={() => toggleRow(record.id)}
                          className="rounded border-[var(--brand-ink)]/20 text-[var(--brand-ink)] focus:ring-[var(--brand-ink)]"
                        />
                      </td>
                      {schema.listColumns.map((col) => {
                        const raw = record.data?.[col];
                        const fieldType = getFieldType(col);

                        if (fieldType === "status") {
                          return (
                            <td key={col} className="px-4 py-3">
                              {getStatusBadge(raw)}
                            </td>
                          );
                        }

                        if (fieldType === "boolean") {
                          return (
                            <td key={col} className="px-4 py-3">
                              {raw ? (
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">
                                  ✓
                                </span>
                              ) : (
                                <span className="text-[var(--brand-ink)]/30">—</span>
                              )}
                            </td>
                          );
                        }

                        if (fieldType === "image" && raw) {
                          return (
                            <td key={col} className="px-4 py-3">
                              <img
                                loading="lazy"
                                decoding="async"
                                src={String(raw)}
                                alt=""
                                className="h-8 w-8 rounded-lg object-cover border"
                              />
                            </td>
                          );
                        }

                        const text =
                          raw === null || raw === undefined
                            ? "—"
                            : Array.isArray(raw)
                              ? raw.join(", ")
                              : String(raw);

                        return (
                          <td
                            key={col}
                            className="max-w-[280px] truncate px-4 py-3 text-[var(--brand-ink)]/80 font-medium"
                          >
                            {text}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setViewingRecord(record)}
                            aria-label="View"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4 text-[var(--brand-ink)]/60" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEdit(record)}
                            aria-label="Edit"
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4 text-[var(--brand-ink)]/60" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(record.id)}
                            aria-label="Delete"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-2xl border border-[var(--brand-ink)]/10 bg-white px-4 py-3 shadow-sm">
                <p className="text-sm text-[var(--brand-ink)]/60">
                  Showing {page * PAGE_SIZE + 1}–
                  {Math.min((page + 1) * PAGE_SIZE, filteredRecords.length)} of{" "}
                  {filteredRecords.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && records.length === 0 && (
          <div className="rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-zinc-100">
              <Plus className="h-6 w-6 text-[var(--brand-ink)]/40" />
            </div>
            <h3 className="text-lg font-bold text-[var(--brand-ink)]">No {schema.plural}</h3>
            <p className="mt-1 mb-4 text-sm text-[var(--brand-ink)]/60">
              Get started by creating your first {schema.singular.toLowerCase()}.
            </p>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" /> Create {schema.singular}
            </Button>
          </div>
        )}

        {/* No search results */}
        {!loading && records.length > 0 && filteredRecords.length === 0 && (
          <div className="rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-12 text-center shadow-sm">
            <p className="text-sm text-[var(--brand-ink)]/60">No results found for "{search}".</p>
            <Button variant="link" onClick={() => setSearch("")}>
              Clear search
            </Button>
          </div>
        )}

        {/* ═══ Create/Edit Modal ═══ */}
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-ink)]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--brand-ink)]/5 p-6 bg-zinc-50/50">
                <h3 className="text-xl font-black text-[var(--brand-ink)]">
                  {editingId ? `Edit ${schema.singular}` : `Create ${schema.singular}`}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-[var(--brand-ink)]/10"
                  onClick={closeModal}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <DynamicForm
                  fields={schema.fields}
                  values={formValues}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="flex shrink-0 items-center justify-end gap-3 border-t border-[var(--brand-ink)]/5 p-6 bg-zinc-50/50">
                <Button variant="outline" className="font-semibold" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white font-semibold"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ View Details Modal ═══ */}
        {viewingRecord && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-ink)]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setViewingRecord(null);
            }}
          >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--brand-ink)]/5 p-6 bg-zinc-50/50">
                <h3 className="text-xl font-black text-[var(--brand-ink)]">
                  {schema.singular} Details
                </h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      openEdit(viewingRecord);
                      setViewingRecord(null);
                    }}
                    className="gap-1"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-[var(--brand-ink)]/10"
                    onClick={() => setViewingRecord(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <dl className="space-y-4">
                  {schema.fields.map((f) => {
                    const val = viewingRecord.data?.[f.key];
                    return (
                      <div key={f.key}>
                        <dt className="text-xs font-bold uppercase tracking-wider text-[var(--brand-ink)]/40 mb-1">
                          {f.label}
                        </dt>
                        <dd className="text-sm text-[var(--brand-ink)] font-medium">
                          {f.type === "status" ? (
                            (getStatusBadge(val) ?? (
                              <span className="text-[var(--brand-ink)]/30">—</span>
                            ))
                          ) : f.type === "boolean" ? (
                            val ? (
                              "Yes"
                            ) : (
                              "No"
                            )
                          ) : f.type === "image" && val ? (
                            <img
                              loading="lazy"
                              decoding="async"
                              src={String(val)}
                              alt=""
                              className="h-16 w-16 rounded-lg object-cover border"
                            />
                          ) : Array.isArray(val) ? (
                            <div className="flex flex-wrap gap-1">
                              {val.map((v, i) => (
                                <span
                                  key={i}
                                  className="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs"
                                >
                                  {String(v)}
                                </span>
                              ))}
                            </div>
                          ) : val !== null && val !== undefined && val !== "" ? (
                            String(val)
                          ) : (
                            <span className="text-[var(--brand-ink)]/30">—</span>
                          )}
                        </dd>
                      </div>
                    );
                  })}
                  <div className="pt-4 border-t border-[var(--brand-ink)]/5">
                    <dt className="text-xs font-bold uppercase tracking-wider text-[var(--brand-ink)]/40 mb-1">
                      Created
                    </dt>
                    <dd className="text-sm text-[var(--brand-ink)]/60">
                      {new Date(viewingRecord.created_at).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
