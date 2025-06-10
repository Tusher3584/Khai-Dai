import React from 'react';

export default function MenuItemCard({ item, isAdmin, onEdit }) {
  return (
    <div className="menu-item-card">
      <div>
        <strong>{item.name}</strong> - ${item.price}
        <div>{item.description}</div>
      </div>
      {isAdmin && (
        <button onClick={() => onEdit(item)}>Edit</button>
      )}
    </div>
  );
}