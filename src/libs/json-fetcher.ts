import httpClient from "@/libs/http-client";

const jsonFetcher = (url: string) => httpClient.get(url).then((res) => res);

export default jsonFetcher;
