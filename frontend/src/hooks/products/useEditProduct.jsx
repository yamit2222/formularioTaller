import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useEditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editProduct = async (id, productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/products/${id}`, productData);
      
      Swal.fire({
        icon: 'success',
        title: '¡Producto actualizado!',
        text: 'El producto se ha actualizado correctamente',
        timer: 1500,
        showConfirmButton: false
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el producto');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Error al actualizar el producto'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    editProduct,
    isLoading,
    error
  };
};
