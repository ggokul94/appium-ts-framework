class HomePage {
    
    getBandXpath() {
        return '//android.widget.ListView/android.widget.LinearLayout/android.widget.TextView[1]';
    }

    getVenueXpath() {
        return '//android.widget.ListView/android.widget.LinearLayout/android.widget.TextView[2]';
    }

    getListXpath() {
        return 'id=com.energyaustralia.codingtestsample:id/festival_list';
    }

    getDataEmptyXpath() {
        return '//*[contains(@text,\" data empty.\")]';
    }

    getWentWrongXpath() {
        return '//*[contains(@text,\"Something went badly wrong...\")]';
    }
}

export default new HomePage();