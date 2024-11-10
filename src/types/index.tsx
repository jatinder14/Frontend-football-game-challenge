export interface ImportItem {
    id: number;
    fileName: string;
    createdAt: string;
  }


  export interface PlayerData {
    id: string;
    goals: number | null;
    saves: number;
    fileId: string;
    height: number;
    weight: number;
    assists: number | null;
    flagImg: string;
    starter: boolean;
    position: string;
    createdAt: string;
    playerImg: string;
    updatedAt: string;
    playerName: string;
    appearances: number;
    cleanSheets: number;
    nationality: string;
    jerseyNumber: number;
    minutesPlayed: number;
  }
  
  export interface RosterData {
    players: PlayerData[];
  }

export interface RosterNewData {
  id: string;
  goals: number | null;
  saves: number | null;
  fileId: string;
  height: number;
  weight: number;
  assists: number | null;
  flagImg: string;
  starter: boolean;
  position: string; // Ensure this is included
  createdAt: string; // ISO 8601 format date string
  playerImg: string;
  updatedAt: string;
  playerName: string;
  appearances: number;
  cleanSheets: number | null;
  nationality: string;
  jerseyNumber: number;
  minutesPlayed: number;
}
  