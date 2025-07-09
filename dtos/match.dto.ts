export class MatchDto {
    id: number;
    player1Id: number;
    player2Id: number;
    sport: string;
    status: string;
    result: string;
    createdAt: Date;

    constructor(match: any) {
        this.id = match.id;
        this.player1Id = match.player1?.id;
        this.player2Id = match.player2?.id;
        this.sport = match.sport;
        this.status = match.status;
        this.result = match.result;
        this.createdAt = match.createdAt;
    }
} 