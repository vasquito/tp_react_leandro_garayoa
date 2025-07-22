import { Button } from 'react-bootstrap';
import "./Paginator.css"

// Componente que muestra los botones de paginación
const Paginator = ({ totalPaginas, paginaActual, cambiarPagina }) => {

    // Cambia a una página específica si está dentro del rango
    const irAPagina = (numeroPagina) => {
        if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
            cambiarPagina(numeroPagina);
        }
    };

  return (
    <div className="d-flex justify-content-center mt-4 flex-wrap">
      {/* Botón Anterior */}
      <Button
        className="anterior"
        disabled={paginaActual === 1}
        onClick={() => irAPagina(paginaActual - 1)}
      >
       Anterior
      </Button>

      {/* Botones numerados */}
      {Array.from({ length: totalPaginas }, (_, indice) => (
        <Button
          key={indice + 1}
          className={paginaActual === indice + 1 ? 'num-enabled' : 'num-disabled'}
          onClick={() => irAPagina(indice + 1)}
        >
          {indice + 1}
        </Button>
      ))}

      {/* Botón Siguiente */}
      <Button
        className="siguiente"
        disabled={paginaActual === totalPaginas}
        onClick={() => irAPagina(paginaActual + 1)}
      >
        Siguiente 
      </Button>
    </div>
  );
};

export default Paginator;