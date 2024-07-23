import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { StoreItem } from '../components/StoreItem';


const Store = () => {
  const [products, setProducts] = useState([]); // Initialize empty products state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products'); // Corrected URL
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item}></StoreItem>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Store;
