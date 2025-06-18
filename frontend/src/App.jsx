import { useState } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import { ProductList } from './components/ProductList';

function App() {
  const [refreshProducts, setRefreshProducts] = useState(0);

  const handleProductAdded = () => {
    setRefreshProducts(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Lubricentro - Sistema de Inventario</h1>
      </nav>
      
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ProductForm onProductAdded={handleProductAdded} />
          </div>
          <div>
            <ProductList refreshTrigger={refreshProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
