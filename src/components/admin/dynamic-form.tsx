/**
 * DynamicForm — Enterprise Form Engine
 * ──────────────────────────────────────────────────────
 * Auto-generates intelligent forms from SchemaField definitions.
 * Maps field types to appropriate Shadcn UI components.
 * No admin should ever need to write JSON.
 */
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { SchemaField } from "@/config/module-schemas";

interface DynamicFormProps {
  fields: SchemaField[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export function DynamicForm({ fields, values, onChange, errors }: DynamicFormProps) {
  return (
    <div className="space-y-5">
      {fields
        .filter((f) => f.type !== "json") // hide JSON fields from normal UI
        .map((field) => (
          <FieldRenderer
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(v) => onChange(field.key, v)}
            error={errors?.[field.key]}
          />
        ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Individual Field Renderer
// ────────────────────────────────────────────────────────

interface FieldRendererProps {
  field: SchemaField;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

function FieldRenderer({ field, value, onChange, error }: FieldRendererProps) {
  const id = `field-${field.key}`;
  const strVal = value === null || value === undefined ? "" : String(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-semibold text-[var(--brand-ink)]/80">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </Label>

      {field.description && (
        <p className="mb-2 text-xs text-[var(--brand-ink)]/50">{field.description}</p>
      )}

      {/* TEXT */}
      {field.type === "text" && (
        <Input
          id={id}
          value={strVal}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <Textarea
          id={id}
          value={strVal}
          onChange={handleChange}
          placeholder={field.placeholder}
          rows={4}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* NUMBER */}
      {field.type === "number" && (
        <Input
          id={id}
          type="number"
          value={strVal}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          placeholder={field.placeholder}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* BOOLEAN / TOGGLE */}
      {field.type === "boolean" && (
        <div className="flex items-center gap-3 rounded-lg border border-[var(--brand-ink)]/10 bg-zinc-50 px-4 py-3">
          <Switch
            id={id}
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked)}
          />
          <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
            {field.placeholder ?? "Enabled"}
          </Label>
        </div>
      )}

      {/* SELECT / DROPDOWN */}
      {field.type === "select" && (
        <select
          id={id}
          value={strVal}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-[var(--brand-ink)]/10 bg-zinc-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-ink)]/20 transition-colors"
        >
          <option value="">— Select —</option>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {/* STATUS (special styled select) */}
      {field.type === "status" && (
        <select
          id={id}
          value={strVal}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-[var(--brand-ink)]/10 bg-zinc-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-ink)]/20 transition-colors"
        >
          <option value="">— Select Status —</option>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o.charAt(0).toUpperCase() + o.slice(1).replace(/_/g, " ")}
            </option>
          ))}
        </select>
      )}

      {/* EMAIL */}
      {field.type === "email" && (
        <Input
          id={id}
          type="email"
          value={strVal}
          onChange={handleChange}
          placeholder={field.placeholder ?? "name@example.com"}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* URL */}
      {field.type === "url" && (
        <Input
          id={id}
          type="url"
          value={strVal}
          onChange={handleChange}
          placeholder={field.placeholder ?? "https://..."}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* PHONE */}
      {field.type === "phone" && (
        <Input
          id={id}
          type="tel"
          value={strVal}
          onChange={handleChange}
          placeholder={field.placeholder ?? "+91 9876543210"}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* DATETIME */}
      {field.type === "datetime" && (
        <Input
          id={id}
          type="datetime-local"
          value={toLocalDatetime(value)}
          onChange={handleChange}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* DATE */}
      {field.type === "date" && (
        <Input
          id={id}
          type="date"
          value={strVal}
          onChange={handleChange}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* TAGS */}
      {field.type === "tags" && (
        <Input
          id={id}
          value={Array.isArray(value) ? (value as string[]).join(", ") : strVal}
          onChange={handleChange}
          placeholder={field.placeholder ?? "Enter comma-separated values..."}
          className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* IMAGE (URL with preview) */}
      {field.type === "image" && (
        <div className="space-y-2">
          <Input
            id={id}
            type="url"
            value={strVal}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
          />
          {strVal && (
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-[var(--brand-ink)]/10">
              <img
                loading="lazy"
                decoding="async"
                src={strVal}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* COLOR */}
      {field.type === "color" && (
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="color"
            value={strVal || "#000000"}
            onChange={handleChange}
            className="h-10 w-10 cursor-pointer rounded-lg border border-[var(--brand-ink)]/10"
          />
          <Input
            value={strVal}
            onChange={handleChange}
            placeholder="#FF6B35"
            className="flex-1 bg-zinc-50 border-[var(--brand-ink)]/10 focus-visible:ring-[var(--brand-ink)]/20"
          />
        </div>
      )}

      {/* SLUG (auto-generated) */}
      {field.type === "slug" && (
        <Input
          id={id}
          value={strVal}
          onChange={handleChange}
          placeholder="auto-generated-slug"
          className="bg-zinc-100 border-[var(--brand-ink)]/10 font-mono text-sm focus-visible:ring-[var(--brand-ink)]/20"
        />
      )}

      {/* Error message */}
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

// Helpers
function toLocalDatetime(v: unknown): string {
  if (!v) return "";
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return "";
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}
