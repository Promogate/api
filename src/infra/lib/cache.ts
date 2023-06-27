import { UPSTASH_REDIS_URL } from '@/main/config';
import Redis from 'ioredis';

export const redis = new Redis(UPSTASH_REDIS_URL);