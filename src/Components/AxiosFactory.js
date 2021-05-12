//sets default api key for Axios => Transavia Api
import axios from 'axios';

axios.defaults.headers.common['apikey'] = '8cf50d59d6244dc68e9b3907367ab059';

export default axios;