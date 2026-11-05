export type BriefTrack = 'product' | 'commerce' | 'platform' | 'experience';
export type BriefStage = 'idea' | 'build' | 'improve';
export type BriefPriority = 'accessibility' | 'reliability' | 'performance' | 'integrations';
export declare const BRIEF_TRACKS: ReadonlyArray<{ readonly id: BriefTrack; readonly label: string }>;
export declare const BRIEF_STAGES: ReadonlyArray<{ readonly id: BriefStage; readonly label: string }>;
export declare const BRIEF_PRIORITIES: ReadonlyArray<{ readonly id: BriefPriority; readonly label: string }>;
export declare function createBrief(input: {track: BriefTrack; stage: BriefStage; priority: BriefPriority; details?: string}): string;
