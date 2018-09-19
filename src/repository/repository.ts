declare var process: any;
declare var require: any;

const axios = require('axios');

export default class Repository
{
  public static create(): any
  {
    const headers = { 'Content-Type': 'application/json' };
    const baseURL = `${process.env.API_SERVER_PROTOCOL}://${process.env.API_SERVER_HOST}`;

    return axios.create({ headers, baseURL });
  }

  public static async get(path: string, params: object): Promise<any>
  {
    const response = await Repository.create().get(Repository.normalizePath(path), { params });

    return Repository.parseResponse(response);
  }

  public static async post(path: string, data: object): Promise<any>
  {
    const response = await Repository.create().post(Repository.normalizePath(path), data);

    return Repository.parseResponse(response);
  }

  private static normalizePath(path: string): string
  {
    if (path.substr(0, 1) === '/') {
      return path;
    }

    return `/${path}`;
  }

  private static parseResponse(response: any): any
  {
    return response.data;
  }
}
