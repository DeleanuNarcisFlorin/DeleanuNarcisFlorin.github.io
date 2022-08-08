export default class DataHandler {
    static $instance = null;
  
    storeInStorage(data) {
      window.sessionStorage.setItem("data", JSON.stringify(data));
    }
  
    retrieveFromStorage() {
      const data = window.sessionStorage.getItem("data");
      
      if(data) {
        return JSON.parse(data);
      }
  
      return null;
    }
  
    async fetchData() {
      try {
        let data = this.retrieveFromStorage();
        
        if(data) {
          return data;
        }
        
        const res = await fetch('data.json');
        data = await res.json();
  
        this.storeInStorage(data);
        return data;
      } catch(err) {
        console.log("Error", err)
      }
    }
  
    static get instance() {
      if(DataHandler.$instance === null) {
        DataHandler.$instance = new DataHandler();
      }
  
      return DataHandler.$instance;
    }
  }