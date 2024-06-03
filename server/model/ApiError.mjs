const errorCodes = {
    "ee-999": "Unbekannter Fehler",
    "ee-404": "Route nicht gefunden, überprüfe die URL!",
    "me-400": "Email oder Telefonnummer existiert bereits",
    "me-401": "Mitglied besitzt bereits ein Trikot",
    "me-323": "Mitglieds ID ist erforderlich",
    "me-324": "Mitgliedsdaten sind erforderlich",
    "me-404": "Mitglied wurde nicht gefunden",
    "fe-404": "Datei nicht gefunden",
    "pe-404": "Zahlung wurde nicht gefunden",
    "te-404": "Trikot wurde nicht gefunden",
    "te-400": "Trikotnummer existiert bereits oder Mitglied besitzt bereits ein Trikot",
    "au-403": "Du bist nicht autorisiert.",
    "fce-400": "Finanzkategorie existiert bereits",
    "fce-404": "Finanzkategorie wurde nicht gefunden",
    "fae-400": "Finanzkonto existiert bereits",
    "fae-404": "Finanzkonto wurde nicht gefunden",
    "fae-422": "Betrag ist zu groß",
};

class ApiError {
    errorCode;
    message;
    relatedColumn;
    data;

    constructor(errorCode, column = null) {
        this.success = false;
        this.errorCode = errorCode;
        this.message = errorCodes[errorCode] || "unbekannter Fehler";
        this.relatedColumn = column;
        return this;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    setRelatedColumn(column) {
        this.relatedColumn = column;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
}

export default ApiError;
