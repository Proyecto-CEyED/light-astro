import { persistentAtom } from "@nanostores/persistent";
import { testApi } from "@/api/test";
import type { Recomendation } from "@/interfaces";

export const recommendations = persistentAtom<Recomendation[]>('recommendations', [
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
    isSelected: true, draft: false,
  },
  { id: "19", name: "Viajes culturales", isSelected: false, draft: false },
  {
    id: "20",
    name: "Fotografía en blanco y negro",
    isSelected: false, draft: true,
  },
], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const fetchRecommendationsFromAPI = async (uid: string) => {
  const response = await testApi.get(`/recommendations/${uid}`);
  const fetchedRecommendations: Recomendation[] = response.data;
  recommendations.set(fetchedRecommendations);

  return recommendations;
};

export const updateRecommendationSelectionInAPI = async (uid: string, recommendationId: string, isSelected: boolean) => {
  const recommendation = recommendations.get().find(r => r.id === recommendationId);
  if (recommendation) {
    const updatedRecommendation = { ...recommendation, isSelected };
    await testApi.put(`/recommendations/${uid}/${recommendationId}`, updatedRecommendation, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    recommendations.set(
      recommendations.get().map((r) => (r.id === recommendationId ? updatedRecommendation : r)),
    );
    return updatedRecommendation;
  }
};

export const toggleRecommendationSelection = (id: string) => {
  recommendations.set(
    recommendations.get().map((rec) =>
      rec.id === id ? { ...rec, isSelected: !rec.isSelected } : rec
    )
  );
};