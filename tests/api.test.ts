import { describe, expect, it } from 'vitest';
import api from '../src/services/api';

describe('API Service', () => {
  it('fetches movies now playing', async () => {
    const result = await api.moviesNowPlaying.list(1);
    expect(result).toBeDefined();
    expect(result.results).toBeDefined();
  });

  it('fetches popular movies', async () => {
    const result = await api.moviesPopular.list(1);
    expect(result).toBeDefined();
    expect(result.results).toBeDefined();
  });

  it('fetches top rated movies', async () => {
    const result = await api.moviesTopRated.list(1);
    expect(result).toBeDefined();
    expect(result.results).toBeDefined();
  });

  it('fetches movie detail', async () => {
    const movieId = 123;
    const result = await api.moviesDetail.list(movieId);
    expect(result).toBeDefined();
    expect(result.title).toBeDefined();
  });
});
