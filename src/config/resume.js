import resumeAsset from '../../resume/r.pdf';

const baseResumeUrl = import.meta.env.VITE_RESUME_URL || resumeAsset;

export const RESUME_URL = baseResumeUrl;
