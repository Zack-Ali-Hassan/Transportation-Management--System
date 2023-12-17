import Routes from "../model/routes_model.js";
export const read_all_routes = async (req, res) => {
  try {
    const getRoutes = await Routes.find({});
    res.status(200).send(getRoutes);
  } catch (error) {
    console.log("Error in reading all routes : " + error);
    res.status(500).json("Unknown");
  }
};
export const read_single_routes = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleRoutes = await Routes.findById(id);
    if (!getSingleRoutes)
      return res.status(404).json(`This id = ${id} is not exist`);
    res.status(200).send(getSingleRoutes);
  } catch (error) {
    console.log("Error in reading  route : " + error);
    res.status(500).json("Unknown");
  }
};
export const register_route = async (req, res) => {
  try {
    const { source_location, destination_location, distance, estimated_time } = req.body;
    const register_routes = new Routes({
      source_location: source_location.toLowerCase(),
      destination_location: destination_location.toLowerCase(),
      distance: distance.toLowerCase(),
      estimated_time: estimated_time.toLowerCase(),
    });
    await register_routes.save();
    res.status(201).json("Registration route successfully");
  } catch (error) {
    console.log("Error in registration route : " + error);
    res.status(500).json("Unknown");
  }
};

export const updated_route = async (req, res) => {
    try {
      const id = req.params.id;
      const { source_location, destination_location, distance, estimated_time } = req.body;
      const existRoute = await Routes.findById(id);
      if (!existRoute)
        return res.status(404).json(`This id = ${id} is not exist`);
      const updated_route = await Routes.findOneAndUpdate(
        { _id: id },
        {
            source_location,
            destination_location,
            distance,
            estimated_time,
        },
        { new: true, runValidator: true }
      );
      res.status(201).json("Updated route successfully");
    } catch (error) {
      console.log("Error in Updated route : " + error);
      res.status(500).json("Unknown error");
    }
  };
  export const deleted_route = async (req, res) => {
    try {
      const id = req.params.id;
      const existRoute = await Routes.findById(id);
      if (!existRoute)
        return res.status(404).json(`This id = ${id} is not exist`);
      const deleted_route = await Routes.findOneAndDelete({ _id: id });
      res.status(201).json("Deleted route successfully");
    } catch (error) {
      console.log("Error in Deleted route : " + error);
      res.status(500).json("Unknown error");
    }
  };