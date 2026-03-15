import { Stadium } from "@domain/entities/Stadium";
import { cities } from "./cities";

//USA
export const AtlantaStadium = new Stadium("Mercedes-Benz Stadium", cities[0], 67382);
export const BostonStadium = new Stadium("Gillette Stadium", cities[1], 63815);
export const DallasStadium = new Stadium("AT&T Stadium", cities[2], 70122);
export const HoustonStadium = new Stadium("NRB Stadium", cities[3], 68311);
export const KansasCityStadium = new Stadium("Arrowhead Stadium", cities[4], 67513);
export const LosAngelesStadium = new Stadium("SoFi Stadium", cities[5], 70000);
export const MiamiStadium = new Stadium("Hard Rock Stadium", cities[6], 65000);
export const NewYorkStadium = new Stadium("MetLife Stadium", cities[7], 75000);
export const PhiladelphiaStadium = new Stadium("Lincoln Stadium", cities[8], 70909);
export const SeattleStadium = new Stadium("Lumen Stadium", cities[9], 69000);
export const SanFransciscoStadium = new Stadium("Levi's Stadium", cities[10], 70909);
//Mexique
export const GuadalajaraStadium = new Stadium("Estadio Akron", cities[11], 44330);
export const MexicoCityStadium = new Stadium("Estadio Azteca", cities[12], 72766);
export const MonterreyStadium = new Stadium("Monterrey Estadio BBVA", cities[13], 50113);
//Canada
export const VancouverStadium = new Stadium("Vancouver BC Place", cities[14], 54000);
export const TorontoStadium = new Stadium("BMO Field", cities[15], 45000);

export const stadiums = [AtlantaStadium, BostonStadium, DallasStadium, HoustonStadium, KansasCityStadium, LosAngelesStadium, MiamiStadium, NewYorkStadium, PhiladelphiaStadium, SeattleStadium, SanFransciscoStadium, GuadalajaraStadium, MexicoCityStadium, MonterreyStadium, VancouverStadium, TorontoStadium];