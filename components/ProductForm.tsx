"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProductForm() {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    category_id: "",
    supplier_id: "",
    unit: "db",
    min_stock: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .insert({
        sku: form.sku,
        name: form.name,
        description: form.description,
        category_id: form.category_id || null,
        supplier_id: form.supplier_id || null,
        unit: form.unit,
        min_stock: form.min_stock,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product created!");

    setForm({
      sku: "",
      name: "",
      description: "",
      category_id: "",
      supplier_id: "",
      unit: "db",
      min_stock: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

      <input
        placeholder="SKU"
        value={form.sku}
        onChange={(e) =>
          setForm({ ...form, sku: e.target.value })
        }
      />

      <input
        placeholder="Product name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        placeholder="Unit"
        value={form.unit}
        onChange={(e) =>
          setForm({ ...form, unit: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Minimum stock"
        value={form.min_stock}
        onChange={(e) =>
          setForm({
            ...form,
            min_stock: Number(e.target.value),
          })
        }
      />

      <button disabled={loading}>
        {loading ? "Saving..." : "Save Product"}
      </button>

    </form>
  );
}