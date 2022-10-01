import httpClient from '../libs/http-client';
import {GenerateRequest} from "@/data/models/Generate";

export function generate(payload: GenerateRequest) {
  return httpClient.post('/api/generate', payload);
}
