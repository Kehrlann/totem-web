var moment              =   require("moment");

var dateConstants = {   dateStart               :   moment().hours(0).minutes(0).seconds(0),
                        dateEnd                 :   moment().hours(23).minutes(59).seconds(59),
                        dateFormat              :   "YYYYMMDDHHmmss",
                        dateFormatForFile       :   "YYYY-MM-DD",
                        dateFormatFromBrowser   :   "YYYY-MM-DD",
                        timeFormat              :   "HH:mm",
                        d3Format                :   "%Y%m%d%H%M%S"
                    };


module.exports = dateConstants;