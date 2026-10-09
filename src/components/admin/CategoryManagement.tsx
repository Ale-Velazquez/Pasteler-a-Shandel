import React, { useState } from 'react';
import { Category, Product } from '../../types';

interface CategoryManagementProps {
  categories: Category[];
  products: Product[];
  onSaveCategory: (cat: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onToggleHideCategory: (categoryId: string) => void;
  onMoveCategoryOrder: (categoryId: string, direction: 'up' | 'down') => void;
}

export const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  products,
  onSaveCategory,
  onDeleteCategory,
  onToggleHideCategory,
  onMoveCategoryOrder,
}) => {
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editImage, setEditImage] = useState('');

  // New category form
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newImage, setNewImage] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGCpZ2w_a2FaigMmOXJNnCl5vpplmR4qNijZPdKh7FKIzDSpx1vYNuYbi-56lBa9EoRjIAUIkrjvPfCd6RjynXXi6X3srCiFSjHidOCKDcZonOklffR81ObTS9zHCeTctrwGJh949KlElDjKJ1KdBBwrYEhkPJ5Z9x0FvnrAf1MhNWqGQHa8mE5jfTSdh61IrPIy37MWQkLZE3VKnOqM5wzj3p8UEYp4q-Fbnt3VeB0FaTBTh5ompJ'
  );

  const startEdit = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditName(cat.name);
    setEditSubtitle(cat.subtitle);
    setEditImage(cat.image);
  };

  const cancelEdit = () => {
    setEditingCatId(null);
  };

  const handleSaveEdit = (cat: Category) => {
    if (!editName.trim()) return;
    onSaveCategory({
      ...cat,
      name: editName.trim(),
      subtitle: editSubtitle.trim() || cat.subtitle,
      image: editImage.trim() || cat.image,
    });
    setEditingCatId(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newName.trim(),
      subtitle: newSubtitle.trim() || 'Especialidad Artesanal',
      image: newImage.trim(),
      count: 0,
      order: categories.length + 1,
      isHidden: false,
    };

    onSaveCategory(newCat);
    setNewName('');
    setNewSubtitle('');
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#211a18]">
            Gestión de Categorías
          </h3>
          <p className="text-xs text-[#544344]">
            Organiza las colecciones del catálogo, reordena secciones y edita nombres o imágenes representativas.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="py-2.5 px-4 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">add</span>
            <span>Nueva Categoría</span>
          </button>
        )}
      </div>

      {/* New Category Box */}
      {isCreating && (
        <form
          onSubmit={handleCreateNew}
          className="p-5 rounded-2xl bg-[#fff8f6] border border-[#ede0dc] flex flex-col gap-3 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#94464f] uppercase tracking-wider">
              Registrar Nueva Categoría
            </span>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-xs text-[#867273] hover:text-[#211a18]"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#211a18]">
                Nombre de la categoría *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej. Tartas Francesas"
                className="h-9 px-3 rounded-xl bg-white border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-1 focus:ring-[#94464f]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#211a18]">
                Subtítulo o lema breve
              </label>
              <input
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="Ej. Horneado con Frutas Finas"
                className="h-9 px-3 rounded-xl bg-white border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-1 focus:ring-[#94464f]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#211a18]">
              URL de imagen representativa
            </label>
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="h-9 px-3 rounded-xl bg-white border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-1 focus:ring-[#94464f]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="py-2 px-4 rounded-full bg-[#f3e5e2] text-[#544344] text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-5 rounded-full bg-[#94464f] text-white text-xs font-bold hover:bg-[#772f39] shadow-xs"
            >
              Guardar Categoría
            </button>
          </div>
        </form>
      )}

      {/* Category List */}
      <div className="flex flex-col gap-3">
        {categories.map((cat, index) => {
          const isEditing = editingCatId === cat.id;
          const assignedCount = products.filter((p) => p.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              className={`p-4 rounded-2xl border transition-all ${
                cat.isHidden
                  ? 'bg-[#f3e5e2]/50 border-dashed border-[#ede0dc] opacity-75'
                  : 'bg-white border-[#ede0dc] shadow-xs'
              }`}
            >
              {isEditing ? (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#211a18]">Nombre</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-9 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-xs text-[#211a18]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#211a18]">Subtítulo</label>
                      <input
                        type="text"
                        value={editSubtitle}
                        onChange={(e) => setEditSubtitle(e.target.value)}
                        className="h-9 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-xs text-[#211a18]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#211a18]">URL de Imagen</label>
                    <input
                      type="text"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="h-9 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-xs text-[#211a18]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="py-1.5 px-3.5 rounded-full bg-[#f3e5e2] text-xs font-semibold text-[#544344]"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(cat)}
                      className="py-1.5 px-4 rounded-full bg-[#94464f] text-white text-xs font-bold hover:bg-[#772f39]"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Reorder Arrows */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => onMoveCategoryOrder(cat.id, 'up')}
                        className="w-5 h-5 flex items-center justify-center text-[#867273] hover:text-[#211a18] disabled:opacity-20 cursor-pointer"
                        title="Subir orden"
                      >
                        <span className="material-symbols-outlined text-[16px]">expand_less</span>
                      </button>
                      <button
                        type="button"
                        disabled={index === categories.length - 1}
                        onClick={() => onMoveCategoryOrder(cat.id, 'down')}
                        className="w-5 h-5 flex items-center justify-center text-[#867273] hover:text-[#211a18] disabled:opacity-20 cursor-pointer"
                        title="Bajar orden"
                      >
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </button>
                    </div>

                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-12 h-12 rounded-xl object-cover bg-[#f9ebe7] shrink-0"
                    />

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#211a18] truncate">
                          {cat.name}
                        </h4>
                        {cat.isHidden && (
                          <span className="px-2 py-0.5 rounded-full bg-[#fedcc9] text-[#785f50] text-[10px] font-semibold">
                            Oculta
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#72594b] truncate">
                        {cat.subtitle} · {assignedCount} productos asignados
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleHideCategory(cat.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        cat.isHidden
                          ? 'bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#c8e6c9]'
                          : 'bg-[#fff1ed] text-[#72594b] hover:bg-[#ede0dc]'
                      }`}
                      title={cat.isHidden ? 'Mostrar en catálogo' : 'Ocultar del catálogo'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {cat.isHidden ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(cat)}
                      className="p-2 rounded-xl bg-[#fff1ed] hover:bg-[#ede0dc] text-[#211a18] transition-colors"
                      title="Editar nombre y foto"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteCategory(cat.id)}
                      className="p-2 rounded-xl bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] transition-colors"
                      title="Eliminar categoría"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
