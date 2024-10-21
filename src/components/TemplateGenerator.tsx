"use client";
import React, { useState, useRef, useEffect } from "react";
import { Type, Image, Eye } from "lucide-react";

const LienzoInteractivo = () => {
  const [elementos, setElementos] = useState([]);
  const [textoActual, setTextoActual] = useState("");
  const [elementoArrastrado, setElementoArrastrado] = useState(null);
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  const lienzoRef = useRef(null);
  const fileInputRef = useRef(null);

  const agregarTexto = () => {
    if (textoActual.trim() !== "") {
      setElementos([
        ...elementos,
        { tipo: "texto", contenido: textoActual, id: Date.now(), x: 10, y: 10 },
      ]);
      setTextoActual("");
    }
  };

  const agregarImagen = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setElementos([
        ...elementos,
        {
          tipo: "imagen",
          url: e.target.result,
          id: Date.now(),
          x: 10,
          y: 10,
        },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const eliminarElemento = (id) => {
    setElementos(elementos.filter((elem) => elem.id !== id));
    setElementoSeleccionado(null);
  };

  const iniciarArrastre = (e, id) => {
    e.preventDefault();
    setElementoArrastrado({ id, inicialX: e.clientX, inicialY: e.clientY });
    setElementoSeleccionado(id);
  };

  const arrastrar = (e) => {
    if (elementoArrastrado) {
      const deltaX = e.clientX - elementoArrastrado.inicialX;
      const deltaY = e.clientY - elementoArrastrado.inicialY;

      setElementos(
        elementos.map((elem) =>
          elem.id === elementoArrastrado.id
            ? { ...elem, x: elem.x + deltaX, y: elem.y + deltaY }
            : elem
        )
      );

      setElementoArrastrado({
        ...elementoArrastrado,
        inicialX: e.clientX,
        inicialY: e.clientY,
      });
    }
  };

  const terminarArrastre = () => {
    setElementoArrastrado(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && elementoSeleccionado) {
        eliminarElemento(elementoSeleccionado);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [elementoSeleccionado]);

  const abrirVistaPrevia = () => {
    setMostrarVistaPrevia(true);
  };

  const cerrarVistaPrevia = () => {
    setMostrarVistaPrevia(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Generador de documentos acreditativos</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={textoActual}
          onChange={(e) => setTextoActual(e.target.value)}
          placeholder="Ingresa texto"
          className="border p-2 rounded"
        />
        <button
          onClick={agregarTexto}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          <Type size={20} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => agregarImagen(e.target.files[0])}
          accept="image/*"
          style={{ display: "none" }}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <Image size={20} />
        </button>
        <button
          onClick={abrirVistaPrevia}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          <Eye size={20} />
        </button>
      </div>
      <div
        ref={lienzoRef}
        className="border-2 border-dashed border-gray-300 p-4 min-h-[400px] relative"
        style={{ width: '816px', height: '1056px' }}
        onMouseMove={arrastrar}
        onMouseUp={terminarArrastre}
        onMouseLeave={terminarArrastre}
      >
        {elementos.map((elem) => (
          <div
            key={elem.id}
            className={`absolute cursor-move ${
              elementoSeleccionado === elem.id ? "ring-2 ring-blue-500" : ""
            }`}
            style={{ left: `${elem.x}px`, top: `${elem.y}px` }}
            onMouseDown={(e) => iniciarArrastre(e, elem.id)}
          >
            {elem.tipo === "texto" ? (
              <p className="bg-white p-2 shadow-md select-text">{elem.contenido}</p>
            ) : (
              <img src={elem.url} alt="Imagen cargada" className="max-w-full max-h-full" />
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Presiona Enter para eliminar el elemento seleccionado
      </p>

      {mostrarVistaPrevia && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={cerrarVistaPrevia}
        >
          <div className="bg-white p-4 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Vista Previa</h3>
            <div className="min-h-[400px] border-2 border-gray-300 p-4 relative">
              {elementos.map((elem) => (
                <div
                  key={elem.id}
                  className="absolute"
                  style={{ left: `${elem.x}px`, top: `${elem.y}px` }}
                >
                  {elem.tipo === "texto" ? (
                    <p>{elem.contenido}</p>
                  ) : (
                    <img
                      src={elem.url}
                      alt="Imagen cargada"
                      className="max-w-full max-h-full"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={cerrarVistaPrevia}
              className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Cerrar Vista Previa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LienzoInteractivo;
