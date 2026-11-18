
import React, { useState, useRef } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  ChevronDown,
  Check,
  Trash2,
} from 'lucide-react';
import { createProduct } from '../../services/productApi';

const CustomCheckbox = ({ checked, onChange, label }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-4 h-4 rounded-[4px] flex items-center justify-center border ${checked
          ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
          : 'bg-white border-gray-300'
        }`}
    >
      {checked && <Check className="w-3 h-3 stroke-[3]" />}
    </button>
    <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">
      {label}
    </span>
  </label>
);

const SelectField = ({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-9 pl-3 pr-8 text-[13px] bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-[#2563EB] ${!value ? 'text-gray-400' : 'text-gray-700'
        }`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>

    <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

const initialFormState = {
  productId: '',
  productCode: '',
  skuBarcode: '',
  productName: '',
  category: '',
  brand: '',
  uom: '',
  displayOrder: '',
  displayGroup: '',
  active: true,
  displayInPos: true,
  customerCard: false,
  price: '',
  sellingPrice: '',
  taxInclusive: true,
  taxCategory: '',
  taxPercent: '',
  taxAmount: '',
  priceNoTax: '',
  sellable: true,
  redeemable: true,
  pointValue: '',
  costPerPoint: '',
  barcodeInput: '',
  barcodes: [],
  minimumStock: '',
  previewImage: null,
};

export default function AddProductsModal({ onClose }) {
  const [categories, setCategories] = useState([
    { value: 'gift-items', label: 'Gift Items' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'food-bev', label: 'Food & Beverage' },
    { value: 'electronics', label: 'Electronics' },
  ]);

  const [brands, setBrands] = useState([
    { value: 'Hotwheels', label: 'Hotwheels' },
    { value: 'Mattel', label: 'Mattel' },
    { value: 'Lego', label: 'Lego' },
    { value: 'Generic', label: 'Generic' },
  ]);

  const [uoms, setUoms] = useState([
    { value: 'PCS', label: 'Pieces (PCS)' },
    { value: 'BOX', label: 'Box (BOX)' },
    { value: 'KG', label: 'Kilogram (KG)' },
    { value: 'LTR', label: 'Liter (LTR)' },
  ]);

  const displayGroups = [
    { value: 'Pizza > Medium', label: 'Pizza > Medium' },
    { value: 'Pizza > Large', label: 'Pizza > Large' },
    { value: 'Toys > Vehicles', label: 'Toys > Vehicles' },
    { value: 'Gifts > Seasonal', label: 'Gifts > Seasonal' },
  ];

  const taxCategories = [
    { value: 'FNB Tax (16%)', label: 'FNB Tax (16%)', rate: 16 },
    { value: 'Standard VAT (5%)', label: 'Standard VAT (5%)', rate: 5 },
    { value: 'Zero Rated (0%)', label: 'Zero Rated (0%)', rate: 0 },
  ];

  const [form, setForm] = useState(initialFormState);
  const [toast, setToast] = useState(null);
  const [quickAddModal, setQuickAddModal] = useState(null);
  const [quickAddValue, setQuickAddValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdatedDate, setLastUpdatedDate] = useState('-');
  const [lastUpdatedUser, setLastUpdatedUser] = useState('-');

  const fileInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  const closeModal = () => {
    onClose?.();
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });

    clearTimeout(toastTimerRef.current);

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const recalculateTax = (rawPrice, rawRate, inclusive) => {
    const numPrice =
      parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0;

    const numRate = parseFloat(rawRate) || 0;

    if (inclusive) {
      const base = numPrice / (1 + numRate / 100);
      const tax = numPrice - base;

      return {
        taxAmount: tax.toFixed(2),
        priceNoTax: base.toFixed(2),
      };
    }

    const tax = numPrice * (numRate / 100);

    return {
      taxAmount: tax.toFixed(2),
      priceNoTax: numPrice.toFixed(2),
    };
  };

  const handlePriceChange = (value) => {
    const cleaned = value.replace(/[^0-9.]/g, '');

    const calc = recalculateTax(
      cleaned,
      form.taxPercent,
      form.taxInclusive
    );

    setForm((prev) => ({
      ...prev,
      price: cleaned,
      ...calc,
    }));
  };

  const handleTaxCategoryChange = (value) => {
    const found = taxCategories.find((item) => item.value === value);
    const rate = found ? String(found.rate) : form.taxPercent;

    const calc = recalculateTax(
      form.price,
      rate,
      form.taxInclusive
    );

    setForm((prev) => ({
      ...prev,
      taxCategory: value,
      taxPercent: rate,
      ...calc,
    }));
  };

  const handleTaxPercentChange = (value) => {
    const cleaned = value.replace(/[^0-9.]/g, '');

    const calc = recalculateTax(
      form.price,
      cleaned,
      form.taxInclusive
    );

    setForm((prev) => ({
      ...prev,
      taxPercent: cleaned,
      ...calc,
    }));
  };

  const handleTaxInclusiveChange = (checked) => {
    const calc = recalculateTax(
      form.price,
      form.taxPercent,
      checked
    );

    setForm((prev) => ({
      ...prev,
      taxInclusive: checked,
      ...calc,
    }));
  };

  const handleGenerateSku = () => {
    const randomNum = String(
      Math.floor(1 + Math.random() * 999999)
    ).padStart(6, '0');

    const sku = `PRD-${randomNum}`;

    updateField('productCode', sku);
    showToast(`Generated SKU: ${sku}`, 'success');
  };

  const handleAutoGenerateBarcode = () => {
    const barcode =
      '6291' +
      Math.floor(100000000 + Math.random() * 900000000);

    setForm((prev) => ({
      ...prev,
      barcodeInput: '',
      barcodes: prev.barcodes.includes(barcode)
        ? prev.barcodes
        : [...prev.barcodes, barcode],
    }));

    showToast(`Generated Barcode: ${barcode}`, 'success');
  };

  const handleBarcodeKeyDown = (e) => {
    if (e.key !== 'Enter' || !form.barcodeInput.trim()) return;

    e.preventDefault();

    const code = form.barcodeInput.trim();

    if (form.barcodes.includes(code)) {
      showToast('Barcode already added', 'warning');
      return;
    }

    setForm((prev) => ({
      ...prev,
      barcodes: [...prev.barcodes, code],
      barcodeInput: '',
    }));

    showToast(`Added barcode: ${code}`, 'success');
  };

  const handleRemoveBarcode = (code) => {
    updateField(
      'barcodes',
      form.barcodes.filter((item) => item !== code)
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      showToast('Only PNG and JPG images are allowed', 'error');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast('File exceeds 2MB limit', 'error');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField('previewImage', reader.result);
      showToast('Product preview uploaded', 'success');
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    updateField('previewImage', null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();

    const trimmed = quickAddValue.trim();

    if (!trimmed) return;

    if (quickAddModal === 'Category') {
      const value = trimmed.toLowerCase().replace(/\s+/g, '-');

      if (categories.some((item) => item.value === value)) {
        showToast('Category already exists', 'warning');
        return;
      }

      setCategories((prev) => [
        ...prev,
        { value, label: trimmed },
      ]);

      updateField('category', value);
    }

    if (quickAddModal === 'Brand') {
      if (
        brands.some(
          (item) =>
            item.value.toLowerCase() === trimmed.toLowerCase()
        )
      ) {
        showToast('Brand already exists', 'warning');
        return;
      }

      setBrands((prev) => [
        ...prev,
        { value: trimmed, label: trimmed },
      ]);

      updateField('brand', trimmed);
    }

    if (quickAddModal === 'Unit of Measure') {
      const code = trimmed.toUpperCase().slice(0, 6);

      if (uoms.some((item) => item.value === code)) {
        showToast('Unit already exists', 'warning');
        return;
      }

      setUoms((prev) => [
        ...prev,
        { value: code, label: trimmed },
      ]);

      updateField('uom', code);
    }

    showToast(`Added new ${quickAddModal}: ${trimmed}`, 'success');

    setQuickAddValue('');
    setQuickAddModal(null);
  };

  const handleNew = () => {
    setForm(initialFormState);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    showToast('Form cleared for new product');
  };

  const handleDuplicate = () => {
    setForm((prev) => ({
      ...prev,
      productId: '',
      productCode: prev.productCode
        ? `${prev.productCode}-COPY`
        : '',
      productName: prev.productName
        ? `${prev.productName} (Copy)`
        : '',
    }));

    showToast('Product duplicated. Save it as a new product.', 'success');
  };

  const validatePositiveNumbers = () => {
    const fields = [
      { name: 'Price', value: form.price },
      { name: 'Selling Price', value: form.sellingPrice },
      { name: 'Tax Percentage', value: form.taxPercent },
      { name: 'Point Value', value: form.pointValue },
      { name: 'Cost Per Point', value: form.costPerPoint },
      { name: 'Minimum Stock', value: form.minimumStock },
      { name: 'Display Order', value: form.displayOrder },
    ];

    for (const field of fields) {
      if (field.value === '') continue;

      const value = Number(field.value);

      if (!Number.isFinite(value) || value < 0) {
        showToast(`${field.name} cannot be negative`, 'error');
        return false;
      }
    }

    if (Number(form.taxPercent) > 100) {
      showToast('Tax Percentage cannot exceed 100%', 'error');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (
      !form.productCode.trim() ||
      !form.productName.trim() ||
      !form.category ||
      !form.brand ||
      !form.uom ||
      form.price === '' ||
      form.sellingPrice === ''
    ) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (!validatePositiveNumbers()) {
      return;
    }

    if (isSaving) return;

    const productData = {
      productCode: form.productCode.trim(),
      barcode: form.barcodes[0] || form.skuBarcode.trim() || '',
      productName: form.productName.trim(),
      category: form.category,
      brand: form.brand,
      unitOfMeasure: form.uom,
      displayOrder: Number(form.displayOrder) || 0,
      displayGroup: form.displayGroup,
      price: Number(form.price),
      sellingPrice: Number(form.sellingPrice),
      taxInclusive: form.taxInclusive,
      taxCategory: form.taxCategory,
      taxPercentage: Number(form.taxPercent) || 0,
      sellable: form.sellable,
      redeemable: form.redeemable,
      pointValue: Number(form.pointValue) || 0,
      costPerPoint: Number(form.costPerPoint) || 0,
      minimumStock: Number(form.minimumStock) || 0,
      active: form.active,
      displayInPOS: form.displayInPos,
      customerCard: form.customerCard,
      image: form.previewImage || '',
    };

    if (
      !Number.isFinite(productData.price) ||
      !Number.isFinite(productData.sellingPrice) ||
      productData.price < 0 ||
      productData.sellingPrice < 0
    ) {
      showToast('Enter valid prices', 'error');
      return;
    }

    setIsSaving(true);

    try {
      const response = await createProduct(productData);

      const responseData = response?.data ?? response;

      const createdProduct =
        responseData?.product ??
        responseData?.data ??
        responseData;

      const generatedId =
        createdProduct?._id ??
        createdProduct?.id ??
        responseData?.productId;

      const updatedDate =
        createdProduct?.updatedAt ||
        createdProduct?.createdAt ||
        responseData?.updatedAt ||
        responseData?.createdAt;

      const updatedUser =
        createdProduct?.updatedBy?.name ||
        createdProduct?.createdBy?.name ||
        createdProduct?.updatedBy ||
        createdProduct?.createdBy ||
        responseData?.updatedBy?.name ||
        responseData?.createdBy?.name ||
        responseData?.updatedBy ||
        responseData?.createdBy;

      setLastUpdatedDate(
        updatedDate
          ? new Date(updatedDate).toLocaleString()
          : '-'
      );

      setLastUpdatedUser(
        updatedUser
          ? typeof updatedUser === 'object'
            ? updatedUser.name || updatedUser.username || '-'
            : String(updatedUser)
          : '-'
      );

      if (!generatedId) {
        console.log('Product API Response:', response);
      } else {
        setForm((prev) => ({
          ...prev,
          productId: String(generatedId),
        }));
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onClose?.();
    } catch (error) {
      showToast(
        error.response?.data?.message ||
        error.message ||
        'Unable to save product',
        'error'
      );
    } finally {
      setIsSaving(false);
    }
  };



  const handleReset = () => {
    setForm(initialFormState);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    showToast('Form and preview reset to defaults');
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 font-sans antialiased"
      onClick={closeModal}
    >
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[80] px-4 py-2.5 rounded-lg shadow-xl text-white text-sm font-medium ${toast.type === 'error'
              ? 'bg-[#E53935]'
              : toast.type === 'success'
                ? 'bg-[#43A047]'
                : toast.type === 'warning'
                  ? 'bg-[#EA580C]'
                  : 'bg-[#2B223C]'
            }`}
        >
          {toast.message}
        </div>
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-product-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-[1115px] max-h-[calc(100vh-32px)] rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col relative"
      >
        <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>

            <h1
              id="add-product-title"
              className="text-[18px] font-medium text-gray-800"
            >
              Add Products
            </h1>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-700 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 flex-1 min-h-0 overflow-y-auto">
          <section className="rounded-xl border border-gray-300 overflow-hidden bg-white">
            <div className="bg-[#2B223C] px-4 py-2.5">
              <h2 className="text-white text-[14px]">
                General Information
              </h2>
            </div>

            <div className="p-4 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-3 items-center">
                <div className="xl:col-span-2 flex items-center gap-2 min-w-0">
                  <label className="text-[13px] font-medium whitespace-nowrap">
                    Product Id
                  </label>
                  <input
                    readOnly
                    value={form.productId}
                    placeholder="Auto"
                    className="min-w-0 w-28 flex-1 h-9 px-2 text-[13px] text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="xl:col-span-4 flex items-center gap-2 min-w-0">
                  <label className="text-[13px] font-medium whitespace-nowrap">
                    Product Code*
                  </label>
                  <input
                    value={form.productCode}
                    onChange={(e) => updateField('productCode', e.target.value)}
                    className="min-w-0 flex-1 h-9 px-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateSku}
                    className="h-9 px-3 bg-[#2563EB] text-white text-xs rounded-md hover:bg-blue-700 shrink-0"
                  >
                    Generate
                  </button>
                </div>

                <div className="xl:col-span-3 flex items-center gap-2 min-w-0">
                  <label className="text-[13px] font-medium whitespace-nowrap">
                    SKU/Barcode
                  </label>
                  <input
                    value={form.skuBarcode}
                    onChange={(e) => updateField('skuBarcode', e.target.value)}
                    className="min-w-0 flex-1 h-9 px-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="xl:col-span-3 flex items-center gap-2 min-w-0">
                  <label className="text-[13px] font-medium whitespace-nowrap">
                    Product Name*
                  </label>
                  <input
                    value={form.productName}
                    onChange={(e) => updateField('productName', e.target.value)}
                    className="min-w-0 flex-1 h-9 px-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    label: 'Category*',
                    value: form.category,
                    options: categories,
                    field: 'Category',
                    placeholder: 'Select Category',
                  },
                  {
                    label: 'Brand*',
                    value: form.brand,
                    options: brands,
                    field: 'Brand',
                    placeholder: 'Select Brand',
                  },
                  {
                    label: 'Unit of Measure*',
                    value: form.uom,
                    options: uoms,
                    field: 'Unit of Measure',
                    placeholder: 'Select UOM',
                  },
                ].map((item) => (
                  <div
                    key={item.field}
                    className="flex items-center gap-2 min-w-0"
                  >
                    <label className="text-[13px] font-medium whitespace-nowrap">
                      {item.label}
                    </label>

                    <SelectField
                      value={item.value}
                      onChange={(value) =>
                        updateField(
                          item.field === 'Category'
                            ? 'category'
                            : item.field === 'Brand'
                              ? 'brand'
                              : 'uom',
                          value
                        )
                      }
                      options={item.options}
                      placeholder={item.placeholder}
                      className="flex-1 min-w-0"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setQuickAddValue('');
                        setQuickAddModal(item.field);
                      }}
                      aria-label={`Add ${item.field}`}
                      className="w-9 h-9 shrink-0 bg-[#2563EB] text-white rounded-md flex items-center justify-center hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-[13px] font-medium whitespace-nowrap">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.displayOrder}
                    onChange={(e) => updateField('displayOrder', e.target.value)}
                    className="w-[65px] h-9 px-2 border border-gray-300 rounded-md text-[13px]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-[13px] font-medium whitespace-nowrap">
                    Display Group
                  </label>
                  <SelectField
                    value={form.displayGroup}
                    onChange={(value) => updateField('displayGroup', value)}
                    options={displayGroups}
                    className="w-[195px]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <CustomCheckbox
                    checked={form.active}
                    onChange={(value) => updateField('active', value)}
                    label="Active"
                  />

                  <CustomCheckbox
                    checked={form.displayInPos}
                    onChange={(value) => updateField('displayInPos', value)}
                    label="Display in POS"
                  />

                  <CustomCheckbox
                    checked={form.customerCard}
                    onChange={(value) => updateField('customerCard', value)}
                    label="Customer Card"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <section className="lg:col-span-4 rounded-xl border border-gray-300 overflow-hidden bg-white">
              <div className="bg-[#2B223C] px-4 py-2.5">
                <h2 className="text-white text-[14px]">Price</h2>
              </div>

              <div className="p-4">
                <div className="pb-3.5 border-b border-gray-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Price*
                      </label>

                      <div className="relative flex-1 min-w-0">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                          $
                        </span>
                        <input
                          value={form.price}
                          onChange={(e) => handlePriceChange(e.target.value)}
                          className="w-full h-9 pl-5 pr-2 border border-gray-300 rounded-md text-[13px]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 min-w-0">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Selling price
                      </label>
                      <input
                        value={form.sellingPrice}
                        onChange={(e) => updateField('sellingPrice', e.target.value)}
                        className="w-full min-w-0 h-9 px-2 border border-gray-300 rounded-md text-[13px]"
                      />
                    </div>
                  </div>

                  <CustomCheckbox
                    checked={form.taxInclusive}
                    onChange={handleTaxInclusiveChange}
                    label="Tax Inclusive"
                  />
                </div>

                <div className="pt-3.5 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Tax Category
                      </label>
                      <SelectField
                        value={form.taxCategory}
                        onChange={handleTaxCategoryChange}
                        options={taxCategories}
                        className="flex-1 min-w-0"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Tax %
                      </label>
                      <input
                        value={form.taxPercent}
                        onChange={(e) => handleTaxPercentChange(e.target.value)}
                        className="w-[65px] h-9 px-2 border border-gray-300 rounded-md text-[13px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Tax
                      </label>
                      <input
                        value={form.taxAmount}
                        onChange={(e) => updateField('taxAmount', e.target.value)}
                        className="w-full min-w-0 h-9 px-2 border border-gray-300 rounded-md text-[13px]"
                      />
                    </div>

                    <div className="flex items-center gap-2 min-w-0">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Price No Tax
                      </label>
                      <input
                        value={form.priceNoTax}
                        onChange={(e) => updateField('priceNoTax', e.target.value)}
                        className="w-full min-w-0 h-9 px-2 border border-gray-300 rounded-md text-[13px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="lg:col-span-6 rounded-xl border border-gray-300 overflow-hidden bg-white">
              <div className="bg-[#2B223C] px-4 py-2.5">
                <h2 className="text-white text-[14px]">
                  Entitlements
                </h2>
              </div>

              <div className="p-4">
                <div className="pb-3.5 border-b border-gray-200 space-y-3">
                  <div className="flex flex-wrap items-center gap-6">
                    <CustomCheckbox
                      checked={form.sellable}
                      onChange={(value) => updateField('sellable', value)}
                      label="Sellable?"
                    />

                    <CustomCheckbox
                      checked={form.redeemable}
                      onChange={(value) => updateField('redeemable', value)}
                      label="Redeemable?"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Point value
                      </label>

                      <div className="relative flex-1 min-w-0">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                          $
                        </span>
                        <input
                          value={form.pointValue}
                          onChange={(e) =>
                            updateField(
                              'pointValue',
                              e.target.value.replace(/[^0-9.]/g, '')
                            )
                          }
                          className="w-full h-9 pl-5 pr-2 border border-gray-300 rounded-md text-[13px]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 min-w-0">
                      <label className="text-[13px] font-medium whitespace-nowrap">
                        Cost Per Point
                      </label>
                      <input
                        value={form.costPerPoint}
                        onChange={(e) => updateField('costPerPoint', e.target.value)}
                        className="w-full min-w-0 h-9 px-2 border border-gray-300 rounded-md text-[13px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-[13px] font-medium whitespace-nowrap">
                      Barcode
                    </label>

                    <input
                      value={form.barcodeInput}
                      onChange={(e) => updateField('barcodeInput', e.target.value)}
                      onKeyDown={handleBarcodeKeyDown}
                      placeholder="Type Barcode & Press Enter"
                      className="flex-1 min-w-[150px] h-9 px-3 border border-gray-300 rounded-md text-[13px]"
                    />

                    <button
                      type="button"
                      onClick={handleAutoGenerateBarcode}
                      className="h-9 px-3 bg-[#2563EB] text-white text-xs rounded-md hover:bg-blue-700"
                    >
                      Auto Generate
                    </button>
                  </div>

                  {form.barcodes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {form.barcodes.map((code) => (
                        <span
                          key={code}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 border border-gray-200 text-[11px] text-gray-700"
                        >
                          {code}
                          <button
                            type="button"
                            onClick={() => handleRemoveBarcode(code)}
                            aria-label={`Remove barcode ${code}`}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2.5">
                    <label className="text-[13px] font-medium whitespace-nowrap">
                      Minimum Stock
                    </label>
                    <input
                      value={form.minimumStock}
                      onChange={(e) => updateField('minimumStock', e.target.value)}
                      className="w-[75px] h-9 px-2.5 border border-gray-300 rounded-md text-[13px]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="lg:col-span-2 rounded-xl border border-gray-300 overflow-hidden bg-white">
              <div className="bg-[#2B223C] px-3 py-2.5 text-center">
                <h2 className="text-white text-[14px]">
                  Product Preview
                </h2>
              </div>

              <div className="p-3 flex flex-col items-center">
                <p className="text-[10.5px] text-gray-500 text-center mb-2.5">
                  PNG, JPG or JPEG (Max 2MB)
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="w-full max-w-[138px] aspect-square rounded-xl border border-dashed border-gray-300 overflow-hidden relative group">
                  {form.previewImage ? (
                    <>
                      <img
                        src={form.previewImage}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        aria-label="Remove product image"
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md shadow"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 left-0 right-0 py-1.5 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Change Image
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-gray-600" />
                      </div>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3.5 w-full bg-[#E53935] hover:bg-red-700 text-white text-[13px] font-medium px-4 py-2 rounded-lg"
                >
                  Reset
                </button>
              </div>
            </section>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
            <div>
              <span className="font-medium text-gray-800 mr-2">
                Last Updated Date
              </span>
              <span className="text-gray-400">{lastUpdatedDate}</span>
            </div>

            <div>
              <span className="font-medium text-gray-800 mr-2">
                Last Updated User
              </span>
              <span className="text-gray-400">{lastUpdatedUser}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-white border-t border-gray-200 px-5 py-3 flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleNew}
            className="bg-[#EA580C] hover:bg-orange-700 text-white text-[13px] font-medium px-7 py-2 rounded-lg min-w-[88px]"
          >
            New
          </button>

          <button
            type="button"
            onClick={handleDuplicate}
            className="bg-[#43A047] hover:bg-green-700 text-white text-[13px] font-medium px-6 py-2 rounded-lg min-w-[92px]"
          >
            Duplicate
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`bg-[#2563EB] text-white text-[13px] font-medium px-7 py-2 rounded-lg min-w-[88px] ${isSaving
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:bg-blue-700'
              }`}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="bg-[#27272A] hover:bg-black text-white text-[13px] font-medium px-6 py-2 rounded-lg min-w-[88px]"
          >
            Cancel
          </button>
        </div>
      </div>

      {quickAddModal && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setQuickAddModal(null)}
        >
          <form
            onSubmit={handleQuickAddSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-sm overflow-hidden"
          >
            <div className="bg-[#2B223C] px-4 py-3 flex items-center justify-between">
              <h3 className="text-white text-sm font-medium">
                Add New {quickAddModal}
              </h3>

              <button
                type="button"
                onClick={() => setQuickAddModal(null)}
                className="text-gray-300 hover:text-white"
                aria-label="Close quick add"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  {quickAddModal} Name
                </label>

                <input
                  type="text"
                  autoFocus
                  value={quickAddValue}
                  onChange={(e) => setQuickAddValue(e.target.value)}
                  placeholder={`Enter ${quickAddModal.toLowerCase()} name...`}
                  className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickAddModal(null)}
                  className="px-4 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-blue-700 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
