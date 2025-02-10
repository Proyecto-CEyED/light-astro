import type { Recomendation } from "@/interfaces";
import React from "react";

const exampleOfRecomendations: Recomendation[] = [
  { id: "1", name: "Diseño UX/UI", isSelected: false, draft: false },
  { id: "2", name: "Tipografía creativa", isSelected: true, draft: false },
  { id: "3", name: "Edición de fotos", isSelected: false, draft: true },
  { id: "4", name: "Fotografía de paisajes", isSelected: false, draft: false },
  { id: "5", name: "Fotografía de retratos", isSelected: true, draft: false },
  { id: "6", name: "Desarrollo en Java", isSelected: false, draft: false },
  { id: "7", name: "Programación funcional", isSelected: true, draft: false },
  { id: "8", name: "Música instrumental", isSelected: false, draft: false },
  { id: "9", name: "Composición musical", isSelected: false, draft: true },
  { id: "10", name: "Fútbol avanzado", isSelected: false, draft: false },
  { id: "11", name: "Técnicas de natación", isSelected: true, draft: false },
  { id: "12", name: "Viajes de aventura", isSelected: false, draft: false },
  { id: "13", name: "Fotografía nocturna", isSelected: false, draft: true },
  { id: "14", name: "Diseño de branding", isSelected: true, draft: false },
  {
    id: "15",
    name: "Desarrollo web con React",
    isSelected: false,
    draft: false,
  },
  { id: "16", name: "Música clásica", isSelected: false, draft: true },
  { id: "17", name: "Buceo recreativo", isSelected: false, draft: false },
  {
    id: "18",
    name: "Maratones y entrenamiento",
    isSelected: true,
    draft: false,
  },
  { id: "19", name: "Viajes culturales", isSelected: false, draft: false },
  {
    id: "20",
    name: "Fotografía en blanco y negro",
    isSelected: false,
    draft: true,
  },
];

export const RecomendationsForm = () => {
  const [recomendations, setRecomendations] = React.useState<Recomendation[]>(
    exampleOfRecomendations,
  );

  const handleToggleSelect = (id: string) => {
    setRecomendations((prevRecomendations) =>
      prevRecomendations.map((recomendation) =>
        recomendation.id === id
          ? { ...recomendation, isSelected: !recomendation.isSelected }
          : recomendation,
      ),
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(
      "Selected Recomendations:",
      recomendations.filter((r) => r.isSelected),
    );
    alert("pending");
  };

  return (
    <div className="col-span-2 flex flex-col items-start justify-center border bg-white mx-auto p-6 gap-6 rounded-lg w-full">
      <h2 className="text-2xl font-semibold text-start">
        Personaliza tus recomendaciones
      </h2>
      <p className="text-gray-400 text-center">
        ¿Qué tipo de contenido te gustaría ver en tu página de inicio?
      </p>

      <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-2 justify-center">
          {recomendations.map((element) => (
            <span
              key={element.id}
              onClick={() => handleToggleSelect(element.id)}
              className={`px-2 py-1 border-primary border-2 rounded-md transition-colors font-semibold cursor-pointer ${element.isSelected ? "text-neutral-50 bg-primary " : "text-primary bg-transparent"}`}
            >
              {element.name}
            </span>
          ))}
        </div>

        {recomendations.some(
          (r) =>
            r.isSelected !==
            exampleOfRecomendations.find((e) => e.id === r.id)?.isSelected,
        ) && (
          <p className="text-red-400 text-start">
            Se detectaron cambios en tus gustos, no olvides guardarlos.
          </p>
        )}

        <button
          type="submit"
          className="px-4 py-3 border-2 border-primary rounded-full text-lg font-semibold hover:bg-primary hover:text-neutral-50 transition-colors"
        >
          Guardar Gustos
        </button>
      </form>
    </div>
  );
};
