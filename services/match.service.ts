import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MatchDto } from '../dtos/match.dto';
import { Match } from '../entities/Match';
import { MatchHistory } from '../entities/MatchHistory';
import { User } from '../entities/User';

const matchRepo = AppDataSource.getRepository(Match);
const matchHistoryRepo = AppDataSource.getRepository(MatchHistory);
const userRepo = AppDataSource.getRepository(User);

export const createMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { player1Id, player2Id, sport } = req.body;
        const player1 = await userRepo.findOneBy({ id: player1Id });
        const player2 = await userRepo.findOneBy({ id: player2Id });
        if (!player1 || !player2) {
            res.status(400).json({ error: 'Invalid player1Id or player2Id' });
            return;
        }
        const match = matchRepo.create({ user1: player1, user2: player2, sportCategory: sport });
        await matchRepo.save(match);
        // MatchHistory 기록
        const history = matchHistoryRepo.create({ match, action: 'requested', actor: player1 });
        await matchHistoryRepo.save(history);
        res.status(201).json(new MatchDto(match));
    } catch (err) {
        res.status(500).json({ error: 'Failed to create match', details: err });
    }
};

export const getAllMatches = async (_req: Request, res: Response): Promise<void> => {
    try {
        const matches = await matchRepo.find({ relations: ['player1', 'player2'] });
        res.json(matches.map((m) => new MatchDto(m)));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch matches', details: err });
    }
};

export const getMatchById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const match = await matchRepo.findOne({ where: { id }, relations: ['player1', 'player2'] });
        if (!match) {
            res.status(404).json({ error: 'Match not found' });
            return;
        }
        res.json(new MatchDto(match));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch match', details: err });
    }
};

export const acceptMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const { actorId } = req.body;
        const match = await matchRepo.findOne({ where: { id }, relations: ['player1', 'player2'] });
        if (!match) {
            res.status(404).json({ error: 'Match not found' });
            return;
        }
        if (match.status !== 'requested') {
            res.status(400).json({ error: 'Match is not in requested state' });
            return;
        }
        match.status = 'accepted';
        match.result = 'pending';
        await matchRepo.save(match);
        const actor = await userRepo.findOneBy({ id: actorId });
        if (!actor) {
            res.status(400).json({ error: 'Invalid actorId' });
            return;
        }
        const history = matchHistoryRepo.create({ match, action: 'accepted', actor });
        await matchHistoryRepo.save(history);
        res.json(new MatchDto(match));
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept match', details: err });
    }
};

export const rejectMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const { actorId } = req.body;
        const match = await matchRepo.findOne({ where: { id }, relations: ['player1', 'player2'] });
        if (!match) {
            res.status(404).json({ error: 'Match not found' });
            return;
        }
        if (match.status !== 'requested') {
            res.status(400).json({ error: 'Match is not in requested state' });
            return;
        }
        match.status = 'rejected';
        match.result = 'rejected';
        await matchRepo.save(match);
        const actor = await userRepo.findOneBy({ id: actorId });
        if (!actor) {
            res.status(400).json({ error: 'Invalid actorId' });
            return;
        }
        const history = matchHistoryRepo.create({ match, action: 'rejected', actor });
        await matchHistoryRepo.save(history);
        res.json(new MatchDto(match));
    } catch (err) {
        res.status(500).json({ error: 'Failed to reject match', details: err });
    }
};

export const setMatchResult = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const { result, actorId } = req.body;
        const match = await matchRepo.findOne({ where: { id }, relations: ['player1', 'player2'] });
        if (!match) {
            res.status(404).json({ error: 'Match not found' });
            return;
        }
        if (match.status !== 'accepted') {
            res.status(400).json({ error: 'Match is not in accepted state' });
            return;
        }
        match.result = result;
        match.status = 'finished';
        await matchRepo.save(match);
        const actor = await userRepo.findOneBy({ id: actorId });
        if (!actor) {
            res.status(400).json({ error: 'Invalid actorId' });
            return;
        }
        const history = matchHistoryRepo.create({ match, action: 'result_set', actor });
        await matchHistoryRepo.save(history);
        res.json(new MatchDto(match));
    } catch (err) {
        res.status(500).json({ error: 'Failed to set match result', details: err });
    }
};

export const getMatchHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const match = await matchRepo.findOneBy({ id });
        if (!match) {
            res.status(404).json({ error: 'Match not found' });
            return;
        }
        const history = await matchHistoryRepo.find({
            where: { match: { id } },
            relations: ['actor'],
            order: { timestamp: 'ASC' }
        });
        res.json(history.map(h => ({
            id: h.id,
            action: h.action,
            actorId: h.actor.id,
            timestamp: h.timestamp,
            detail: h.detail || null,
        })));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch match history', details: err });
    }
}; 