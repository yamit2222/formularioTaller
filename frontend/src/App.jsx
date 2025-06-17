import { useState } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import { ProductList } from './components/ProductList';

function App() {
  const [refreshProducts, setRefreshProducts] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleProductAdded = () => {
    setRefreshProducts(prev => prev + 1);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Lubricentro - Sistema de Inventario</h1>
      </nav>
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
            </h2>
            <ProductForm 
              product={editingProduct}
              onProductAdded={handleProductAdded} 
              onCancel={handleCancelEdit}
            />
          </div>
          <div>
            <ProductList 
              refreshTrigger={refreshProducts} 
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
