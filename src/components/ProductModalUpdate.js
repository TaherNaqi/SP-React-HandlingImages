import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import productStore from "../stores/productStore";

function ProductModalUpdate({ oldProduct }) {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({
    name: oldProduct.name,
    image: oldProduct.image,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImage = (event) =>
    setProduct({ ...product, [event.target.name]: event.target.files[0] });
  const handleChange = (event) =>
    setProduct({ ...product, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    productStore.updateProduct(product, oldProduct._id);
    console.log(product);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e)}
              placeholder="Product Name"
            />
            <input name="image" onChange={handleImage} placeholder="Image" />
            <button type="submit">Edit</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductModalUpdate;
