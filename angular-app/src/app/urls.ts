export class APIurls {
  public static ApiUrl = 'https://localhost:7091';
  public static login = APIurls.ApiUrl + '/identity/login';
  public static register = APIurls.ApiUrl + '/identity/register';
  public static getWeather = APIurls.ApiUrl + '/WeatherForecast';
}
