import axios, { AxiosInstance } from "axios";

export default class AxiosController {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  protected get rest(): AxiosInstance {
    return axios.create({
      baseURL: this.url,
      headers: {
        "Content-Type ": "application/json ",
        "X-Requested-With ": "XMLHttpRequest ",
      },
    });
  }
}
