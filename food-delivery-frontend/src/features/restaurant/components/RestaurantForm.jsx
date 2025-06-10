import React, { useState, useEffect } from 'react';

export default function RestaurantForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    rating: '',
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
      rating: form.rating ? parseFloat(form.rating) : undefined,
    });
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input name="rating" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
}