import moment from "moment";

export function formatDate(value, opts = {}) {
  if (!value) return "";
  const defaults = {
    format: "dddd, MMMM Do YYYY, h:mm:ss A",
    parseFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
    utc: false
  };
  const options = Object.assign(defaults, opts);
  if (options.utc) {
    return moment.utc(value, options.parseFormat).format(options.format);
  }
  return moment(value, options.parseFormat).format(options.format);
}
