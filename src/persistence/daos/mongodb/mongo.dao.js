export default class MongoDao {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const response = await this.model.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await this.model.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }


  async update(id, obj) {
    try {
      const response = await this.model.updateOne({ _id: id }, obj);
      return response; // (x)
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

  // async getByEmail(obj) {
  //     try{
  //         console.log("getByEmail input:", obj);
  //         const response = await this.model.findOne({ email: obj.email });
  //         return response;
  //     }catch(error){
  //         console.log(error);
  //     };
  // };