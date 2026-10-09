import React, { useState, useEffect } from 'react';
import { Product, Category, PortionType, AnticipationType, ProductSizeOption } from '../../types';

interface ProductFormModalProps {
  isOpen: boolean;
  productToEdit: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (productData: Product) => void;
  onPreview: (productData: Product) => void;
}

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Gâteau Velours Royal', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFNkNOPgbJ6uXR1JwlWBgO3pQQoWYOcb6JpbaUTCOC9UE_jz9SiauQV9mXqF1iPHGlO6dxuxjoKKrv_bXT6XTiqMqFkianpxgwFueBqb91plt7aMeaLumkp6rCZpLpb1cHnuLhxyYitA83S_G77irtCvfEus-B5JT833xJQ-I_w51wzVBRBoZMdnf2abw0I_2vruZi7fHzsZ0qjHEag5Rnl6bkNIAQww4hI3tjbx8leMYp-jb82YDv' },
  { label: 'Ópera de Frambuesa', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7yyvXzDgNntkZg8dk9tk1shj3bDsSVOfoTRRx8jxsJXTUwh6n-eGi1p_MSEhjgWSAh488SmTRrb5FRyeMumcohpDmHadfFoRQTG-rWlYKNiJd289aOKkyblcWiBaCfXnRYGqTmkcxK4vR7VkENFbQDR2Hfq9MPj09i4D-88aeagVDb6-C9CuPRqVU0G5FTdPNhUWqV0xlPsl6lj54IJKdOYMm3CCmj-Bnu6imseM8gcPmQTCbcSRx' },
  { label: 'Saint-Honoré Vainilla', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALfJ87764EKo8s8_UacXOwAalcq6AQC_LURGrc60XLNde8iBajjy5NCDggPdfaADOZX4GIbsjdBkMNrUGDID5cyujEzZ0qalx3jLpbVuLF4gftqNS4WWQXU8rKE2aQKW334tI-7n9wulWbq-I__hevw5Be03hdbO3o1E7Ob8ZcsqQI2NShz3Cchl4_3Iur-sk99rSMziA1lFEKHJf3ckB_WeCyh5M8-hyE7XmBt1LO-VY1KOeIm1hC' },
  { label: 'Cheesecake Frutos Rojos', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIYknnY2niY7tD_sHJTJ2Zj-1ULXh5SXt6iubbuQZyKyIfReh2kL4x_entKjpETzDtupi8EeAghcBCpJX6PbBB0sPVkr_XjV53tkbcenL-hZ9l9gX1Yj-7D9Pf6jIP1rHr75FYdapGQmSA2roQA25jUUBKalpQrQLudMRD2XUXP0ra3Z2OP-kUUTkVg-OOXN3klYZiKg13SGLU4tDucLIRo8SonF3xSBJ8gqDPAv0DZ1tpwf0ABgL6' },
  { label: 'Red Velvet', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzvNqVAFzDlFow17QtiI2_eMa0AZV-dOzPTSUSyDUvvGwcHUlCUEqxNg_8CoRnzE3br096dWG9ldVa45GoRZp2oyNbvpIe95c5m3Vax2DBniZHrVtOdB99RPTAwgJ1NuiWmoFYh8stoHQU4KlJyBSNq8n7ouBJRy5RW2KK5CCV6Zv_f6gsh9xVgTmuw3xxXfblDzfX7UxtyeEdZ7H_ehMXr9dtzpIy-r-S33yTuFdhr6XkFiMEy0qV' },
  { label: 'Tres Leches Gourmet', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCopYSTXyFCdzB3dAjc1N5QI376h-kwMsfz1cPQTYMbIYU4yAlpi0NA58jah2VoV4Uy87QJ4xITqa5jPwk9T0Wvrj2RNh77CouUUzR-aV1TPU5gHfCQMSxJm4iGE7y2VEPTKMohesB5y2mmceqzMtbQ6QgauCGztUx204O5uBpRqYz89I6gardR5fGCiGaS8kJoGgvokj5rfHNjRWEwxMLSZzAghqZ1LLTLfJianRHdhYiHKgFz_L_8' },
  { label: 'Personalizado 3 Pisos', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv1vlogK9mODbfxstWZp5RhGAJBnk1pzLj_v7PQiM1sHyNlTU8hXJveaya4vdDr4vZNnV3s6L5PhmhGsKPHl8u_ulSZsBKhVi2A0veb_6vpp9LYRssIAshMqraB9TFm8azh_7h8gOBY557TKlw4jTXUmD9BsZMqpNGTJ8ll4ZCPJ9Wf5B99mtiCbne1rAC5UPOlArUNIu8g13dDir1uktGudVRzDCT6oTc6psKp_BZDNtXyWsaxqJh' },
  { label: 'Caja Macarons & Eclairs', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5jC14lDkmzp2_ffoOvQkJlt_CbUuAUzBTwqACjSo2RfI_BQRxUyh55ySmMcBOv7qfENXTbcr2SMXuY8MyvVF_EKMJ6-UpoIrof1CabZGSDD4ID0SMrYkKH_kz9S9rOKgSlCYixjGNQ_Vj0lXGdezUwsUrf61QhwzRpZURTy8OADTlC4615zjxLKEoq5VdkEL1QBi78pWczfZLw1MJh01tA80niFhjp5q2WQ3eOW4Zk94HZ8XIlu6p' },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  productToEdit,
  categories,
  onClose,
  onSave,
  onPreview,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cumpleanos');
  const [price, setPrice] = useState(450);
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [image, setImage] = useState(SAMPLE_PHOTO_PRESETS[0].url);
  const [servingsText, setServingsText] = useState('8-10 porciones');
  const [portionType, setPortionType] = useState<PortionType>('mediano');
  const [anticipation, setAnticipation] = useState<AnticipationType>('48h');
  const [flavors, setFlavors] = useState<string[]>(['Vainilla Tradicional']);
  const [newFlavorInput, setNewFlavorInput] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [sizes, setSizes] = useState<ProductSizeOption[]>([
    { name: 'Mediano (8-10 personas)', servings: '8-10 porc.', priceModifier: 0 },
    { name: 'Familiar (12-14 personas)', servings: '12-14 porc.', priceModifier: 150 },
  ]);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategoryId(productToEdit.categoryId);
      setPrice(productToEdit.price);
      setTag(productToEdit.tag || '');
      setDescription(productToEdit.description);
      setDetailedDescription(productToEdit.detailedDescription);
      setImage(productToEdit.image);
      setServingsText(productToEdit.servingsText);
      setPortionType(productToEdit.portionType);
      setAnticipation(productToEdit.anticipation);
      setFlavors(productToEdit.flavors || []);
      setIsPublished(productToEdit.isPublished);
      setIsBestseller(!!productToEdit.isBestseller);
      setIsFeatured(!!productToEdit.isFeatured);
      setSizes(productToEdit.sizes || []);
    } else {
      setName('');
      setCategoryId(categories[0]?.id || 'cumpleanos');
      setPrice(450);
      setTag('');
      setDescription('');
      setDetailedDescription('');
      setImage(SAMPLE_PHOTO_PRESETS[0].url);
      setServingsText('8-10 porciones');
      setPortionType('mediano');
      setAnticipation('48h');
      setFlavors(['Vainilla de Papantla', 'Chocolate Amargo']);
      setIsPublished(true);
      setIsBestseller(false);
      setIsFeatured(false);
      setSizes([
        { name: 'Mediano (8-10 personas)', servings: '8-10 porc.', priceModifier: 0 },
        { name: 'Familiar (12-14 personas)', servings: '12-14 porc.', priceModifier: 150 },
      ]);
    }
    setValidationError('');
  }, [productToEdit, categories]);

  const handleAddFlavor = () => {
    if (newFlavorInput.trim() && !flavors.includes(newFlavorInput.trim())) {
      setFlavors([...flavors, newFlavorInput.trim()]);
      setNewFlavorInput('');
    }
  };

  const handleRemoveFlavor = (index: number) => {
    setFlavors(flavors.filter((_, i) => i !== index));
  };

  const buildProductObject = (): Product => {
    const selectedCategoryObj = categories.find((c) => c.id === categoryId);
    const categoryName = selectedCategoryObj ? selectedCategoryObj.name : 'Pastelería';

    let anticipationLabel = 'Anticipación: 48h';
    if (anticipation === 'today') anticipationLabel = 'Disponible para hoy';
    if (anticipation === '24h') anticipationLabel = 'Anticipación 24 hrs';
    if (anticipation === '72h') anticipationLabel = 'Anticipación 72 hrs';

    return {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name: name.trim(),
      category: categoryName,
      categoryId,
      tag: tag.trim() || undefined,
      description: description.trim(),
      detailedDescription: detailedDescription.trim() || description.trim(),
      price: Number(price) || 0,
      image,
      servingsText: servingsText.trim(),
      portionType,
      anticipation,
      anticipationLabel,
      flavors,
      sizes,
      isFeatured,
      isBestseller,
      isPublished,
      createdAt: productToEdit ? productToEdit.createdAt : new Date().toISOString().split('T')[0],
    };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Por favor ingresa el nombre del pastel o producto.');
      return;
    }
    if (!description.trim()) {
      setValidationError('Por favor ingresa una descripción para el producto.');
      return;
    }
    if (price <= 0) {
      setValidationError('El precio debe ser mayor a 0 MXN.');
      return;
    }

    const newProd = buildProductObject();
    onSave(newProd);
  };

  const handlePreviewClick = () => {
    if (!name.trim()) {
      setValidationError('Ingresa al menos un nombre para previsualizar.');
      return;
    }
    const previewProd = buildProductObject();
    onPreview(previewProd);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#ede0dc] relative my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] flex items-center justify-center text-[#211a18] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col gap-1 border-b border-[#ede0dc] pb-4 mb-4">
          <span className="text-[10px] font-bold tracking-widest text-[#94464f] uppercase">
            Gestión de Catálogo Shandel
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#211a18]">
            {productToEdit ? 'Editar Producto' : 'Crear Nuevo Producto'}
          </h2>
          <span className="text-xs text-[#544344]">
            {productToEdit
              ? 'Modifica las características y guarda para actualizar el catálogo público.'
              : 'Completa los campos para agregar una nueva creación a la vitrina.'}
          </span>
        </div>

        {validationError && (
          <div className="mb-4 p-3 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-xs">
          {/* Row 1: Name and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">
                Nombre del producto *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Tarta de Moras Silvestres con Frangipane"
                className="h-10 px-3 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              />
            </div>
            <div className="sm:col-span-4 flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">Categoría *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Price, Tag and Anticipation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">
                Precio base ($ MXN) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">
                Etiqueta / Badge (Opcional)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Ej. Más vendido, Especialidad"
                className="h-10 px-3 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">
                Tiempo de anticipación
              </label>
              <select
                value={anticipation}
                onChange={(e: any) => setAnticipation(e.target.value)}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              >
                <option value="today">Disponible para hoy</option>
                <option value="24h">Anticipación 24 hrs</option>
                <option value="48h">Anticipación 48 hrs</option>
                <option value="72h">Anticipación 72 hrs</option>
              </select>
            </div>
          </div>

          {/* Row 3: Servings Text and Portion Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">
                Texto de porciones visibles
              </label>
              <input
                type="text"
                value={servingsText}
                onChange={(e) => setServingsText(e.target.value)}
                placeholder="Ej. 10-12 porciones"
                className="h-10 px-3 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">
                Clasificación de porciones (filtro)
              </label>
              <select
                value={portionType}
                onChange={(e: any) => setPortionType(e.target.value)}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              >
                <option value="individual">Individual (1-2 personas)</option>
                <option value="mediano">Mediano (8-10 personas)</option>
                <option value="familiar">Familiar (12-16 personas)</option>
                <option value="eventos">Eventos (20+ personas)</option>
              </select>
            </div>
          </div>

          {/* Row 4: Descriptions */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#211a18]">
              Descripción breve (para la tarjeta de catálogo) *
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Capas finas de bizcocho con notas de vainilla y relleno suave..."
              className="p-2.5 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#211a18]">
              Descripción detallada (ficha técnica completa)
            </label>
            <textarea
              rows={3}
              value={detailedDescription}
              onChange={(e) => setDetailedDescription(e.target.value)}
              placeholder="Explica técnicas de elaboración, ingredientes destacados y notas de cata..."
              className="p-2.5 rounded-xl bg-[#fff1ed] text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f] resize-none"
            />
          </div>

          {/* Row 5: Photography URL & Presets */}
          <div className="p-3.5 rounded-2xl bg-[#fff8f6] border border-[#ede0dc] flex flex-col gap-2.5">
            <label className="font-semibold text-[#211a18] flex items-center justify-between">
              <span>Fotografía del producto</span>
              <span className="text-[10px] text-[#72594b]">
                URL o presets de alta repostería
              </span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="flex-1 h-9 px-3 rounded-xl bg-white text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              />
              <img
                src={image}
                alt="Vista previa miniatura"
                className="w-9 h-9 rounded-lg object-cover border border-[#ede0dc] bg-white shrink-0"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[10px] text-[#867273] shrink-0">Presets:</span>
              {SAMPLE_PHOTO_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImage(preset.url)}
                  className={`text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border ${
                    image === preset.url
                      ? 'bg-[#94464f] text-white border-[#94464f]'
                      : 'bg-white text-[#544344] border-[#ede0dc] hover:bg-[#f9ebe7]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 6: Flavors Management */}
          <div className="p-3.5 rounded-2xl bg-[#fff8f6] border border-[#ede0dc] flex flex-col gap-2">
            <label className="font-semibold text-[#211a18]">
              Sabores disponibles para este producto
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFlavorInput}
                onChange={(e) => setNewFlavorInput(e.target.value)}
                placeholder="Agregar sabor (ej. Chocolate 70%, Vainilla Papantla)..."
                className="flex-1 h-9 px-3 rounded-xl bg-white text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFlavor();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddFlavor}
                className="px-3 py-1.5 rounded-xl bg-[#fedcc9] text-[#785f50] font-semibold hover:bg-[#ffdadb] hover:text-[#94464f]"
              >
                + Añadir
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {flavors.map((flv, idx) => (
                <span
                  key={flv}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#ede0dc] text-[11px] text-[#211a18] flex items-center gap-1.5"
                >
                  <span>{flv}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFlavor(idx)}
                    className="text-[#867273] hover:text-[#ba1a1a]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 7: Switches (Published, Featured, Bestseller) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <label className="flex items-center gap-2 p-3 rounded-xl bg-[#fff8f6] border border-[#ede0dc] cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="accent-[#94464f] w-4 h-4 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[#211a18]">
                  Publicar en catálogo
                </span>
                <span className="text-[10px] text-[#72594b]">
                  {isPublished ? 'Visible para clientes' : 'Oculto (Borrador)'}
                </span>
              </div>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl bg-[#fff8f6] border border-[#ede0dc] cursor-pointer">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="accent-[#94464f] w-4 h-4 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[#211a18]">Más vendido</span>
                <span className="text-[10px] text-[#72594b]">
                  Aparece en inicio
                </span>
              </div>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl bg-[#fff8f6] border border-[#ede0dc] cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="accent-[#94464f] w-4 h-4 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[#211a18]">Destacado</span>
                <span className="text-[10px] text-[#72594b]">
                  Prioridad en vitrina
                </span>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#ede0dc] mt-2">
            <button
              type="button"
              onClick={handlePreviewClick}
              className="w-full sm:w-auto py-2.5 px-4 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] text-[#211a18] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px] text-[#775a00]">
                visibility
              </span>
              <span>Vista previa antes de guardar</span>
            </button>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 rounded-full bg-[#f3e5e2] text-[#544344] hover:bg-[#ede0dc] font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">
                  save
                </span>
                <span>
                  {productToEdit ? 'Guardar Cambios' : 'Crear Producto'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
