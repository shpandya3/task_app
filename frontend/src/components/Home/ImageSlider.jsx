import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { ProductService } from './service/ProductService';

function ImageSlider() {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  useEffect(() => {
      ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
  }, []);

  const productTemplate = (product) => {
      return (
          <div className="border-1 surface-border border-round h-30rem">
              <div>
                  <img src={`${product.image}`} alt={product.name} className="w-full h-full shadow-2 object-fit: cover" />
              </div>
              <div>
                  {/* <h4 className="mb-1">{product.name}</h4>
                  <h6 className="mt-0 mb-3">${product.price}</h6>
                  <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                  {/* <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                      <Button icon="pi pi-search" rounded />
                      <Button icon="pi pi-star-fill" rounded severity="success" />
                  </div> */}
              </div>
          </div>
      );
  };

  return (
      <div className="card">
          <Carousel value={products} autoplayInterval={2000} numVisible={1} numScroll={1} showNavigators={false} showIndicators={false} responsiveOptions={responsiveOptions} itemTemplate={productTemplate}/>
      </div>
  )
}

export default ImageSlider;
