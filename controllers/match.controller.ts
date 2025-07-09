import { Request, Response } from 'express';
import * as matchService from '../services/match.service';

export const createMatch = async (req: Request, res: Response): Promise<void> => matchService.createMatch(req, res);
export const getAllMatches = async (req: Request, res: Response): Promise<void> => matchService.getAllMatches(req, res);
export const getMatchById = async (req: Request, res: Response): Promise<void> => matchService.getMatchById(req, res);
export const acceptMatch = async (req: Request, res: Response): Promise<void> => matchService.acceptMatch(req, res);
export const rejectMatch = async (req: Request, res: Response): Promise<void> => matchService.rejectMatch(req, res);
export const setMatchResult = async (req: Request, res: Response): Promise<void> => matchService.setMatchResult(req, res);
export const getMatchHistory = async (req: Request, res: Response): Promise<void> => matchService.getMatchHistory(req, res); 