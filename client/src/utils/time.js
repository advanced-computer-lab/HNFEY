import moment from "moment";

const getDifference = (startTime, endTime) => {
  startTime = moment(startTime).format("DD HH:mm:ss a");
  endTime = moment(endTime).format("DD HH:mm:ss a");
  startTime = moment(startTime, "DD HH:mm:ss a");
  endTime = moment(endTime, "DD HH:mm:ss a");

  // calculate total duration
  var duration = moment.duration(endTime.diff(startTime));

  // duration in hours
  var days = parseInt(duration.asDays());
  var hours = parseInt(duration.asHours() % 24);

  // duration in minutes
  var minutes = parseInt(duration.asMinutes()) % 60;

  return (days !== 0 ? days + "d " : "") + hours + "h " + minutes + "m";
};

export default getDifference;
