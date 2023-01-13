export default class DateHelper {
    static getLast12Date() {
        let currentDate = new Date(new Date().setDate(new Date().getDate() - 1));
        let endDate = new Date();
        endDate = new Date(endDate.setDate(currentDate.getDate() - 12));
        return DateHelper.getDates(currentDate, endDate);
    }

    static getDates(startDate: Date, stopDate: Date) {
        let dateArray: Date[] = new Array();
        let currentDate = startDate;
        while (currentDate > stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));

        }
        return dateArray;
    }
}
