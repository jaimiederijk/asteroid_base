import "axios" from "axios";

export default {
  async getNewSystem() {
    const { data } = await axios.get('/getnewsystem');
    return data;
  }
}
