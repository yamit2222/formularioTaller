import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button,
  Box,
  Dialog,
  ThemeProvider,
  createTheme,
  useTheme,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './App.css';
import '../src/styles/products.css';
import ProductForm from './components/ProductForm';
import { ProductList } from './components/ProductList';

function App() {
  const [refreshProducts, setRefreshProducts] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleProductAction = () => {
    setRefreshProducts(prev => prev + 1);
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Lubricentro - Sistema de Inventario
            </Typography>
            <Button 
              color="inherit" 
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Nuevo Producto
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <ProductList refreshTrigger={refreshProducts} />
        </Container>

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
          fullScreen={fullScreen}
        >
          <ProductForm
            onCancel={() => setOpenDialog(false)}
            onSubmit={handleProductAction}
          />
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
