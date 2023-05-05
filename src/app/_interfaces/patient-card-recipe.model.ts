import { Recipe } from "./recipe.model";

export interface PatientCardRecipeModel {
  patientId: number;
  patientFio: string;

  listDoctor?: string[];
  listMedicine?: string[];
  listFinSource?: string[];

  recipes?: Recipe[];
}