import generateClient from "@/libs/generate-client";
import {GenerateRequest} from "@/data/models/Generate";

export class GenerateService {
  generate(input: GenerateRequest) {
    return generateClient.post('/generate',{
      input,
    });
  }
}
