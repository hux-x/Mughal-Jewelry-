import ProductPage from '../../../src/components/products/page';
import productService from '../../../src/api/services/productService';

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const response = await productService.getAllProducts();
    console.log(response)
    
    if (response.products) {
      console.log(`Generating static pages for ${response.products.length} products`);
      return response.products.map((product) => ({
        productId: product._id,
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export const dynamicParams = false;

export default async function Page({ params }) {
  const { productId } = await params;
  
  return (
    <ProductPage productId={productId} />
  );
}