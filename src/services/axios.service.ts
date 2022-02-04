const axios = require('axios').default;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = false;

export function getUserByCondition(condition: {
  [key: string]: string;
}): Promise<any> {
  return axios.post('/veggie/find', condition); // returns user or error
}

export function submitLoginForm(data: any): Promise<any> {
  return axios.post('/veggie/login', data); // returns jwt token or error
}

export function submitRegisterForm(data: any): Promise<any> {
  return axios.post('/veggie/create', data); // returns new user without password or error
}

export function createProduct(data: any): Promise<any> {
  return axios.post('/product/create', data); // returns new product or error
}

export function createShop(data: any): Promise<any> {
  return axios.post('/shop/create', data); // returns new shop or error
}

export function createEat(data: any): Promise<any> {
  return axios.post('/eat/create', data); // returns new restaurant or error
}

export function getCloudinaryUrl(dataString: any): Promise<any> {
  return axios.post('/cloudinary', dataString);
}

export function getEatsSearchResults(searchOptions: any) {
  return axios.post('/eat/findall', searchOptions);
}

export function getShopsSearchResults(searchOptions: any) {
  return axios.post('/shop/findall', searchOptions);
}

export function getProductsSearchResults(searchOptions: any) {
  return axios.post('/product/findall', searchOptions);
}
