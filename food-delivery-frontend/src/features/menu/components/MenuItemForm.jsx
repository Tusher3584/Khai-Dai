import React, { useState, useEffect } from 'react';

export default function MenuItemForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    ...initialData,
  });

  useEffect(() => {
    setForm(f => ({ ...f, ...initialData }));
  }, [initialData]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: form.price ? parseFloat(form.price) : undefined,
    });
  };

  return (
    <form className="menu-item-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
}