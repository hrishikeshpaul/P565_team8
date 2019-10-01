const Ajv = require('ajv');

function isValid(schema, data) {
    const ajv = new Ajv();
    const valid = ajv.validate(require(schema), data);
    if (!valid) {
        console.log('*****User data is INVALID!*****');
        console.log(ajv.errors);
        console.log(data);
    } else
        console.log('-----User data is valid-----');
}

function append(json, key, value) {
    const b = JSON.parse(JSON.stringify(basicInfo));
    b[key] = value;
    return b;

}

const basicInfo = {"first_name": "a", "last_name": "b", "email": "a@b.c", "userID": "1"};

const date1 = {"year": 2021, "month": "May"};
const applicants = [
    // {"first_name": "a", "last_name": "b", "email": "a@b.c","userID":"1"},//OK
    // {"first_name": "a", "last_name": "b", "email": "ab.c","userID":"1"},//X
    // {"first_name": "a", "last_name": "b", "email": "a@b.c","userID":"01"},//X
    // {"first_name": "a", "last_name": "b", "email": "a@b.c","userID":"1"},//OK
    // {"first_name": "a", "last_name": "b", "email": "a@b.c","userID":"1","Degree":"d"},//X
    // {"first_name": "a", "last_name": "b", "email": "a@b.c","userID":"1","Degree":"Bachelor"},//OK
    // {"first_name": "a", "last_name": "b", "email": "a@b.c", "userID": "1", "Graduate": {"year": 1800, "month": "May"}},//X
    // {"first_name": "a", "last_name": "b", "email": "a@b.c", "userID": "1", "Graduate": {"year": "2021", "month": "May"}},//X
    // {"first_name": "a", "last_name": "b", "email": "a@b.c", "userID": "1", "Graduate": {"year": 2021, "month": 5}},//OK
    // {"first_name": "a", "last_name": "b", "email": "a@b.c", "userID": "1", "Graduate": {"year": 2021, "month": "May"}},//OK
    // append(basicInfo,"Projects",[]),//OK
    // append(basicInfo,"Projects",[{"detail":"a","beginDate":date1,"endDate":"Psresent"}]),//X
    // append(basicInfo, "Projects", [{"detail": "a", "beginDate": date1, "endDate": "Present"}]),//OK
    // append(basicInfo, "Projects", [{"detail": "a", "beginDate": date1, "endDate": date1}]),//OK
    // append(basicInfo, "Projects", [{"detail": "a", "beginDate": date1, "endDate": date1},
    //     {"detail": "B", "beginDate": date1, "endDate": date1}]),//OK
    // append(basicInfo, "Educations", [{"detail": "school a", "beginDate": date1, "endDate": date1}]),//OK
    append(basicInfo, "Skills", ["Java","Python"]),//OK
];
for (i in applicants) {
    isValid('./applicant.json', applicants[i]);
}
