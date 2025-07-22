import React from "react";
import "./AdmProducts.css"
import { useContext, useState } from "react";
import { Table, Col, Container, Row, Button, Form, Modal} from "react-bootstrap";
import { ProductsContext } from "../context/products/ProductsContext";
import Swal from "sweetalert2";
import {isValid, parseISO, format} from 'date-fns';
import Paginator from '../components/Paginator';

const AdmProducts=()=>
{
    const {products, isLoading, error, fetchProducts, API_URL_PRODUCTS} = useContext(ProductsContext);  
    if (isLoading) return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
    if (error) return <p className="text-error text-center mt-8">Error al cargar la lista de productos: {error}</p>;

    // Estado para la página actual
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 6;

    // Lógica de paginación
    const indiceUltimoProducto = paginaActual * productosPorPagina; 
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productsVisibles = products.slice(indicePrimerProducto, indiceUltimoProducto);
    const totalPaginas = Math.ceil(products.length / productosPorPagina);

    //Variables
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentItem, setCurrentItem] = useState(null);
    const [newProduct, setNewProduct] = useState({
        title: "",
        desc: "",
        cover: "",
        store_date: "",
        price: "",
        rating: "",
        category: ""
    });

    //Manejo de Modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setNewProduct({
            title: "",
            desc: "",
            cover: "",
            store_date: "",
            price: "",
            rating: "",
            category: ""
        });
        setCurrentItem(null);
    };

    //Modifico el campo y el objeto newProduct
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardarNuevo = () => {
        // Validaciones
        if (!newProduct.title.trim()) {
            Swal.fire("Error", "El nombre es obligatorio", "error");
            return;
        }
        if (!newProduct.desc.trim()) {
            Swal.fire("Error", "La descripcion es obligatoria", "error");
            return;
        }
        if (!newProduct.cover.trim()) {
            Swal.fire("Error", "La url de la imagen es obligatoria", "error");
            return;
        }
        if (!newProduct.store_date.trim()) {
            Swal.fire("Error", "La fecha de publicacion es obligatoria", "error");
            return;
        } else {
            if (!isValid(parseISO(newProduct.store_date))) {
                Swal.fire("Error", "La fecha de publicacion es invalida y el formato debera ser 'dd-mm-yyyy'", "error");
                return;
            }
        }
        if (!newProduct.category.trim()) {
            Swal.fire("Error", "La categoria es obligatoria", "error");
            return;
        }
        
        // Si no pone nada en precio, es 0.01
        const priceFinal = newProduct.price === "" ? 0.01 : Number(newProduct.price);
        if (priceFinal <= 0) {
            Swal.fire("Error", "El precio debe ser mayor a 0", "error");
            return;
        }
        
        // Rating
        const ratingFinal = newProduct.rating === "" ? 0 : Number(newProduct.rating);
        if (!((ratingFinal >= 0) && ratingFinal <= 5)) {
            Swal.fire("Error", "El rating debe ser entre 0 y 5", "error");
            return;
        }

        const storedate = parseISO(newProduct.store_date);
        const formatted = format(storedate, 'yyyy-MM-dd');
        console.log(formatted); // "1957-02-01"

        setNewProduct((prev) => ({
            ...prev,
            rating: ratingFinal,
            price: priceFinal,
            store_date: formatted,
        }));

        setTimeout(() => {
            if (modalMode === "edit") {
                handleUpdate();
            } else {
                handleCreate();
            }
        }, 0);
    };

    //ABM
    const handleCreate = async () => {
        const productToSave = {...newProduct};
        try {
            console.log(productToSave);
            const res = await fetch(API_URL_PRODUCTS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productToSave),
            });
            if (!res.ok) {
                throw new Error(`Error al crear item - status: ${res.status}`);
            }
            await fetchProducts();
            handleCloseModal();
        } catch (error) {
            Swal.fire("Error", "Error creando item", "error");
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        if (!currentItem?.id) {
            Swal.fire("Error", "El producto no tiene un ID válido. No se puede actualizar.", "error");
            return;
        }
        const id = String(currentItem.id);
        const payload = {...newProduct};

        try {
            const res = await fetch(`${API_URL_PRODUCTS}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`Error al actualizar item - status: ${res.status}`);
            }
            await fetchProducts();
            handleCloseModal();  
        } catch (error) {
            Swal.fire("Error", "Error actualizando el producto. Puede que ya no exista o haya un problema en los datos.", "error");
            console.error("Error en handleUpdate:", error);
            handleCloseModal();
            await fetchProducts();
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Seguro que quieres eliminar este item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`${API_URL_PRODUCTS}/${id}`, { method: "DELETE" });
                if (!res.ok) {
                    throw new Error("Error al eliminar item");
                }
                await fetchProducts();
                Swal.fire("Eliminado", "El item fue eliminado correctamente.", "success");
            } catch (error) {
                Swal.fire("Error", "Error eliminando item", "error");
                console.error(error);
            }
        }
    };

    // Función para capitalizar cada palabra
    function capitalizeWords(str) {
        return str.replace(/\w\S*/g, (w) =>
            w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        );
    }

    return(
        <section className="adm-products">
            <Container >
                <Row className="justify-content-center">
                    <Col md={12}>
                        <h1 className="title">Administracion de Productos</h1><br/>
                        <div className="text-end mb-4">
                            <Row>
                                <Col className="justify-content-center" md={8}>
                                    <Paginator totalPaginas={totalPaginas} paginaActual={paginaActual} cambiarPagina={setPaginaActual} />
                                </Col>
                                <Col md={4}>
                                    <Button className="agregar" onClick={() => {
                                        setModalMode("create");
                                        setCurrentItem(null);
                                        handleShowModal();
                                    }}>
                                        Agregar Producto
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                        {products.length === 0 && (
                            <h1 className="no-items product">No hay items</h1>
                        )}
                        {products.length > 0 && (
                            <div className="abm-products-list table-responsive" >
                                <Table striped bordered hover>
                                    <thead className="table-comics">
                                        <tr>
                                            <th className="header">Foto</th>
                                            <th className="header">Nombre</th>
                                            <th className="header">Descripcion</th>
                                            <th className="header">Fecha Publicacion</th>
                                            <th className="header">Precio</th>
                                            <th className="header">Categoria</th>
                                            <th className="header">Rating</th>
                                            <th className="header">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsVisibles.map(item => (
                                            <tr key={item.id}>
                                                <td className="image-holder"><img loading="lazy" src={item.cover} alt=""/></td>
                                                <td>{item.title}</td>
                                                <td><div className="description" dangerouslySetInnerHTML={{ __html: item.desc}}/></td>
                                                <td>{item.store_date}</td>
                                                <td>${item.price}</td>
                                                <td>{item.category}</td>
                                                <td>{item.rating}</td>
                                                <td>
                                                <Button variant="warning" size="sm" className="me-2" onClick={() => {
                                                    setModalMode("edit");
                                                    setCurrentItem(item);
                                                    setNewProduct(item);
                                                    handleShowModal();
                                                }}>
                                                    Editar
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => {
                                                    handleDelete(item.id)
                                                }}>
                                                    Borrar
                                                </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>    
                        )}
                    </Col>
                </Row>


                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalMode === "edit" ? "Editar" : "Nuevo"} Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2">
                            <Form.Label>Nombre *</Form.Label>
                            <Form.Control name="title" value={newProduct.title} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Descripción *</Form.Label>
                                <Form.Control as="textarea" rows={5} name="desc" value={newProduct.desc} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Imagen *</Form.Label>
                                <Form.Control name="cover" value={newProduct.cover} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Fecha Publicacion *</Form.Label>
                                <Form.Control type="date" name="store_date" value={newProduct.store_date} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Precio *</Form.Label>
                                <Form.Control type="number" min="1" name="price" value={newProduct.price} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Categoria *</Form.Label>
                                <Form.Select
                                    name="category" value={newProduct.category}
                                    onChange={e => {
                                        setNewProduct({ ...newProduct, category: e.target.value });
                                    }}
                                    required>
                                    <option value="">Seleccione una categoria...</option>    
                                    <option value="DC Comics">DC Comics</option>
                                    <option value="Marvel">Marvel</option>
                                    <option value="Star Wars">Star Wars</option>
                                    <option value="Otros">Otros</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Rating *</Form.Label>
                                <Form.Control type="number" min="1" max="5" name="rating" value={newProduct.rating} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                        <Button variant="primary" onClick={handleGuardarNuevo}>Guardar</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </section>
    );
};

export default AdmProducts;